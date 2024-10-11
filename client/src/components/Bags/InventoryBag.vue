<template>
    <div class="container">
      <h1>เป๋า</h1>
  
      <!-- Display all bags in a grid layout -->
      <div v-if="filteredBags.length" class="bag-grid">
        <div v-for="(bag, index) in filteredBags" :key="bag.bagID" class="bag-card">
          
          <!-- Show the thumbnail if available -->
          <transition name="fade">
            <div class="thumbnail-pic" v-if="bag.thumbnail !== 'null' && bag.thumbnail">
              <img :src="BASE_URL + bag.thumbnail" alt="thumbnail" class="bag-image">
            </div>
          </transition>
  
          <!-- Show all pictures if available -->
          <div v-if="bag.pictures && bag.pictures.length" class="pictures">
            <h3>Images</h3>
            <ul>
              <li v-for="(picture, picIndex) in bag.pictures" :key="picture.id">
                <img :src="BASE_URL + picture" alt="Picture" class="bag-image">
              </li>
            </ul>
          </div>
          
          <!-- Display bag details -->
          <p><b>Item #:</b> {{ index + 1 }}</p> <!-- Display the index of the item -->
          <p><b>Name:</b> {{ bag.name }}</p>
          <p><b>Brand:</b> {{ bag.brand }}</p>
          <button class="action-button view-button" @click="navigateTo('/bag/' + bag.id)">ดู Bag</button>
        </div>
      </div>
  
      <div v-else>
        <p>No bags available</p>
      </div>
    </div>
  </template>
  
  
  
  <script>
import BagsService from "@/services/BagsService";

export default {
  data() {
    return {
      bags: [],
      filteredBags: [],
      searchQuery: '',
      BASE_URL: "http://localhost:8081/assets/uploads/",
    };
  },
  async created() {
    try {
      
      const response = await BagsService.index();
      this.bags = response.data;

      
      this.bags.forEach(bag => {
        if (bag.pictures) {
          try {
            bag.pictures = JSON.parse(bag.pictures);
          } catch (e) {
            console.error("Error parsing pictures for bag:", bag.name);
            bag.pictures = [];
          }
        }
      });

      this.filteredBags = this.bags; 
    } catch (error) {
      console.log("Error fetching bag details:", error);
    }
  },
  methods: {
    filterBags() {
      const query = this.searchQuery.toLowerCase();
      this.filteredBags = this.bags.filter(bag => 
        bag.name.toLowerCase().includes(query) ||
        bag.brand.toLowerCase().includes(query)
      );
    },
    navigateTo(route) {
      this.$router.push(route);
    }
  }
};
</script>

  
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bag-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

.bag-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}

.thumbnail-pic {
  margin-bottom: 15px;
}

.pictures ul {
  list-style-type: none;
  padding: 0;
}

.pictures li {
  display: inline-block;
  margin-right: 10px;
}

.bag-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.bag-card p {
  margin: 5px 0;
}

.bag-card b {
  font-weight: bold;
}
</style>

  
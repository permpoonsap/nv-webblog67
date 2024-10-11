<template>
  <div class="container">
    <h1>Show Bag</h1>

    
    <div v-if="bag">
      <div class="bag-details">
        
        
       

        <!-- All Images -->
        <div v-if="pictures.length" class="pictures">
          <h3>Images</h3>
          <ul>
            <li v-for="picture in pictures" :key="picture.id">
              <img :src="BASE_URL + picture.name" alt="Picture">
            </li>
          </ul>
        </div>

        <p><b>BagID:</b> {{ bag.bagID }}</p>
        <p><b>Name:</b> {{ bag.name }}</p>
        <p><b>Brand:</b> {{ bag.brand }}</p>
        <p><b>Category:</b> {{ bag.category }}</p>
        <p><b>Material:</b> {{ bag.material }}</p>
        <p><b>Color:</b> {{ bag.color }}</p>
        <p><b>Size:</b> {{ bag.size }}</p>
        <p><b>Price:</b> {{ bag.price }} บาท</p>

        <p>
          <button @click="navigateTo('/bags')">Back</button>
        </p>
      </div>

      
    </div>
  </div>
</template>

<script>
import BagsService from "@/services/BagsService";

export default {
  data() {
    return {
      bag: null, 
      bags: [],  
      BASE_URL: "http://localhost:8081/assets/uploads/",
      pictures: [] 
    };
  },
  async created() {
    try {
      
      let bagId = this.$route.params.bagId;

      
      const response = await BagsService.show(bagId);
      this.bag = response.data;
      this.pictures = JSON.parse(this.bag.pictures || "[]");

      
      this.bags = (await BagsService.index()).data;
    } catch (error) {
      console.log("Error fetching bag details:", error);
    }
  },
  methods: {
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

.bag-details {
  text-align: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
}

.thumbnail {
  margin-bottom: 15px;
}

.thumbnail img {
  max-width: 500px; /* Thumbnail image size */
  height: auto;     /* Maintain aspect ratio */
  border: 1px solid #ddd;
  border-radius: 8px;
}

.pictures {
  margin-bottom: 15px;
}

.pictures ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.pictures li {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  background-color: #fff;
}

.pictures img {
  max-width: 300px; /* Larger image size */
  height: auto;     /* Maintain aspect ratio */
  border: 1px solid #ddd;
  border-radius: 8px;
}

button {
  margin-top: 15px;
}

.bag-list {
  margin-top: 20px;
}

.bag-card {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}

</style>

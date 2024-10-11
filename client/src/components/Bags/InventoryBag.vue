<template>
    <div class="container">
      <h1>All Bag</h1>
  
      <!-- Search Input -->
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="ค้นหาโดยใช้ชื่อหรือแบรนด์..."
          @input="filterBags"
        />
      </div>
  
      <!-- Display all bags in a grid layout -->
      <div v-if="filteredBags.length" class="bag-grid">
        <div
          v-for="(bag, index) in filteredBags"
          :key="bag.bagID"
          class="bag-card"
        >

  
          <!-- Show all pictures if available -->
          <div v-if="bag.pictures && bag.pictures.length" class="pictures">
              <li v-for="(picture, picIndex) in bag.pictures" :key="picture.id">
                <img :src="BASE_URL + picture.name" alt="Picture" class="bag-image" />
              </li>
          </div>
  
          <!-- Display bag details -->
          <p><b>Item #:</b> {{ index + 1 }}</p>
          <p><b>Name:</b> {{ bag.name }}</p>
          <p><b>Brand:</b> {{ bag.brand }}</p>
          <p><b>Category:</b> {{ bag.category }}</p>
          <p><b>Material:</b> {{ bag.material }}</p>
          <p><b>Color:</b> {{ bag.color }}</p>
          <p><b>Size:</b> {{ bag.size }}</p>
          <p><b>Price:</b> {{ bag.price }} บาท</p>
          
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
        searchQuery: "",
        BASE_URL: "http://localhost:8081/assets/uploads/",
      };
    },
    async created() {
      try {
        const response = await BagsService.index();
        this.bags = response.data;
  
        // Parse pictures if available
        this.bags.forEach((bag) => {
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
        this.filteredBags = this.bags.filter(
          (bag) =>
            bag.name.toLowerCase().includes(query) ||
            bag.brand.toLowerCase().includes(query)
        );
      },
      navigateTo(route) {
        this.$router.push(route);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Main container styling */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* Search bar styling */
  .search-bar {
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .search-bar input {
    width: 100%;
    max-width: 500px;
    padding: 10px;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid #ccc;
    outline: none;
    transition: all 0.3s ease;
  }
  
  .search-bar input:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  
  /* Bag grid layout */
  .bag-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    width: 100%;
  }
  
  /* Individual bag card styling */
  .bag-card {
    background-color: white;
    border: 1px solid #e3e3e3;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .bag-card:hover {
    transform: translateY(-5px);
  }
  
  .thumbnail-pic img,
  .bag-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    border: 1px solid #ddd;
  }
  
  /* Styling for details text */
  .bag-card p {
    margin: 10px 0;
    color: #333;
  }
  
  .bag-card b {
    font-weight: bold;
  }
  
  /* View button */
  .view-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  
  .view-button:hover {
    background-color: #0056b3;
  }
  
  .view-button:focus {
    outline: none;
  }
  </style>
  
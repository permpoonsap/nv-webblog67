<template>
  <div class="bag-management">
    <h2 class="title">Get All Bags</h2>
    <div class="actions">
      <button class="action-button create-button" @click="navigateTo('/bag/create')">สร้าง Bag</button>
    </div>
    
    <input 
      type="text" 
      v-model="searchQuery" 
      placeholder="ค้นหา Bag" 
      class="search-input"
      @input="filterBags"
    />
    
    <h4 class="bag-count">จำนวนกระเป๋าที่มีอยู่ในคลัง: {{ filteredBags.length }}</h4>
    <hr class="divider"/>

    <div v-if="filteredBags.length" class="bag-list">
      <div v-for="bag in filteredBags" :key="bag.id" class="bag-card">
        <div class="bag-details">
          <p><b>BagID:</b> {{ bag.bagID }}</p>
          <p><b>Name:</b> {{ bag.name }}</p>
          <p><b>Brand:</b> {{ bag.brand }}</p>
          <p><b>Category:</b> {{ bag.category }}</p>
          <p><b>Material:</b> {{ bag.material }}</p>
          <p><b>Color:</b> {{ bag.color }}</p>
          <p><b>Size:</b> {{ bag.size }}</p>
          <p><b>Price:</b> {{ bag.price }} บาท</p>
          
          
        </div>
        <div class="bag-actions">
          <button class="action-button view-button" @click="navigateTo('/bag/' + bag.id)">ดู Bag</button>
          <button class="action-button edit-button" @click="navigateTo('/bag/edit/' + bag.id)">แก้ไข Bag</button>
          <button class="action-button delete-button" @click="deleteBag(bag)">ลบข้อมูล</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="no-results">ไม่พบ Bag ที่ตรงกับการค้นหา</p>
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
  await this.loadBags();
},
methods: {
  async loadBags() {
    try {
      const response = await BagsService.index();
      this.bags = response.data;
      this.filteredBags = this.bags; // Initialize filtered bags
    } catch (err) {
      console.error("Error fetching bags:", err);
    }
  },
  filterBags() {
    const query = this.searchQuery.toLowerCase();
    this.filteredBags = this.bags.filter(bag => 
      bag.name.toLowerCase().includes(query) ||
      bag.brand.toLowerCase().includes(query) ||
      bag.category.toLowerCase().includes(query)
    );
  },
  navigateTo(route) {
    this.$router.push(route);
  },
  async deleteBag(bag) {
    const result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
    if (result) {
      try {
        await BagsService.delete(bag.id);
        await this.loadBags(); 
        alert("ลบข้อมูลสำเร็จ");
      } catch (err) {
        console.error("Error deleting bag:", err);
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    }
  }
}
};
</script>

<style scoped>
.bag-management {
max-width: 800px;
margin: auto;
padding: 20px;
background: #f4f6f8;
border-radius: 10px;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
text-align: center;
font-size: 1.8em;
color: #333;
margin-bottom: 20px;
}

.actions {
display: flex;
justify-content: flex-end;
margin-bottom: 15px;
}

.search-input {
padding: 10px;
border: 1px solid #ddd;
border-radius: 5px;
width: 100%;
margin-bottom: 15px;
}

.action-button {
padding: 10px 15px;
border-radius: 5px;
border: none;
cursor: pointer;
transition: background-color 0.3s ease;
font-size: 1em;
}

.create-button {
background-color: #27ae60;
color: #fff;
}

.create-button:hover {
background-color: #229954;
}

.bag-list {
display: flex;
flex-direction: column;
gap: 15px;
}

.bag-card {
background: #ffffff;
padding: 15px;
border-radius: 8px;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
display: flex;
justify-content: space-between;
align-items: center;
}

.bag-details {
flex: 1;
margin-right: 20px;
}

.bag-actions {
display: flex;
gap: 10px;
}

.view-button {
background-color: #3498db;
color: #fff;
}

.view-button:hover {
background-color: #2980b9;
}

.edit-button {
background-color: #f39c12;
color: #fff;
}

.edit-button:hover {
background-color: #e67e22;
}

.delete-button {
background-color: #e74c3c;
color: #fff;
}

.delete-button:hover {
background-color: #c0392b;
}

.divider {
border: none;
border-top: 1px solid #ddd;
margin: 15px 0;
}

.bag-count {
text-align: center;
color: #555;
margin-bottom: 10px;
}

.no-results {
text-align: center;
color: #999;
}
</style>

<template>
    <div class="bag-management">
      <h2 class="title">Get All Bags</h2>
      <div class="actions">
        <button class="action-button create-button" @click="navigateTo('/bag/create')">สร้าง Bag</button>
        
      </div>
      <h4 class="bag-count">จำนวน Bag: {{ bags.length }}</h4>
      <hr class="divider" />
  
      <div v-if="bags.length" class="bag-list">
        <div v-for="bag in bags" :key="bag.id" class="bag-card">
          <div class="bag-details">
            <p><b>ID:</b> {{ bag.id }}</p>
            <p><b>Name:</b> {{ bag.name }}</p>
            <p><b>Description:</b> {{ bag.description }}</p>
            <p><b>Category:</b> {{ bag.category }}</p>
            <p><b>Price:</b> {{ bag.price }} บาท</p>
            <p><b>Status:</b> {{ bag.status }}</p>
          </div>
          <div class="bag-actions">
            <button class="action-button view-button" @click="navigateTo('/bag/' + bag.id)">ดู Bag</button>
            <button class="action-button edit-button" @click="navigateTo('/bag/edit/' + bag.id)">แก้ไข Bag</button>
            <button class="action-button delete-button" @click="deleteBag(bag)">ลบข้อมูล</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import BagsService from "@/services/BagsService";
  
  export default {
    data() {
      return {
        bags: []
      };
    },
    async created() {
      this.bags = (await BagsService.index()).data;
    },
    methods: {
      navigateTo(route) {
        this.$router.push(route);
      },
      async deleteBag(bag) {
        let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
        if (result) {
          try {
            await BagsService.delete(bag);
            this.refreshData();
          } catch (err) {
            console.log(err);
          }
        }
      },
      async refreshData() {
        this.bags = (await BagsService.index()).data;
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
  </style>
  
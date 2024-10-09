<template>
  <div class="user-management">
    <h1 class="title">Get All Users</h1>
    <div class="actions">
      <button class="action-button create-button" @click="navigateTo('/user/create')">สร้างผู้ใช้</button>
      <button class="action-button logout-button" @click="logout">Logout</button>
    </div>
    <hr class="divider" />

    <div v-if="users.length" class="user-list">
      <div class="user-summary">
        <b>จำนวนผู้ใช้งาน:</b> {{ users.length }}
      </div>
      <div v-for="user in users" :key="user.id" class="user-card">
        <div class="user-details">
          <p><b>ID:</b> {{ user.id }}</p>
          <p><b>ชื่อผู้ใช้:</b> {{ user.name }} {{ user.lastname }}</p>
          <p><b>อีเมล:</b> {{ user.email }}</p>
          <p><b>สถานะ:</b> {{ user.status }}</p>
          <p><b>ประเภท:</b> {{ user.type }}</p>
        </div>
        <div class="user-actions">
          <button class="action-button view-button" @click="navigateTo('/user/' + user.id)">ดูข้อมูล</button>
          <button class="action-button edit-button" @click="navigateTo('/user/edit/' + user.id)">แก้ไขข้อมูล</button>
          <button class="action-button delete-button" @click="deleteUser(user)">ลบข้อมูล</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
export default {
  data() {
    return {
      users: []
    };
  },
  async created() {
    try {
      this.users = (await UsersService.index()).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user) {
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
      if (result) {
        try {
          await UsersService.delete(user);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      try {
        this.users = (await UsersService.index()).data;
      } catch (err) {
        console.log(err);
      }
    },
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style scoped>
.user-management {
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
  justify-content: space-between;
  margin-bottom: 20px;
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

.logout-button {
  background-color: #e74c3c;
  color: #fff;
}

.logout-button:hover {
  background-color: #c0392b;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.user-card {
  background: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-details {
  flex: 1;
  margin-right: 20px;
}

.user-actions {
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
</style>

<template>
  <div class="create-user-container">
    <h1>Create User</h1>
    <form class="create-user-form" v-on:submit.prevent="createUser">
      <div class="input-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="user.name" placeholder="Enter your name" required>
      </div>
      <div class="input-group">
        <label for="lastname">Lastname</label>
        <input type="text" id="lastname" v-model="user.lastname" placeholder="Enter your lastname" required>
      </div>
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="user.email" placeholder="Enter your email" required>
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="user.password" placeholder="Enter your password" required>
      </div>
      <div>
        <button type="submit" class="submit-button">Create User</button>
        
      </div>
    </form>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService';

export default {
  data() {
    return {
      user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        status: 'active'
      }
    };
  },
  methods: {
    async createUser() {
      try {
        await UsersService.post(this.user);
        // Redirect to the login page after user creation
        this.$router.push('/login');  // Adjust the route as necessary
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.create-user-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
}

.create-user-form {
  display: flex;
  flex-direction: column;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: 600;
}

.input-group input {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.input-group input:focus {
  border-color: #007bff;
  outline: none;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>

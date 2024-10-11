<template>
  <div class="login-container">
    <h1 class="title">User Login</h1>
    <form class="login-form" v-on:submit.prevent="onLogin">
      <div class="input-group">
        <label for="email">Gmail</label>
        <input 
          type="text" 
          id="email" 
          v-model="email" 
          placeholder="Enter your Gmail"
        />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          placeholder="Enter your password"
          required
        />
      </div>
      <button type="submit" class="login-button">Login</button>
      <div class="error" v-if="error">{{ error }}</div>
      <!-- New Create User Link -->
      <div class="create-user-link">
        <router-link to="/user/create">Create a new account</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import AuthenService from '@/services/AuthenService'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password
        })

        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        this.$router.push({
          name: 'bags'
        })

      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
        this.email = ''
        this.password = ''
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title {
  margin-bottom: 20px;
  color: #333;
  font-size: 1.5em;
  font-weight: 600;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: 500;
}

.input-group input {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.input-group input:focus {
  border-color: #007bff;
  outline: none;
}

.login-button {
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

.login-button:hover {
  background-color: #0056b3;
}

.error {
  margin-top: 10px;
  color: #d9534f;
  font-weight: 500;
}

/* New Create User Link */
.create-user-link {
  margin-top: 15px;
}

.create-user-link a {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.create-user-link a:hover {
  color: #0056b3;
}
</style>

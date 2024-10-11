<template>
  <div>
    <nav class="nv-navbar">
      <ul class="nav">
        <li><router-link :to="{ name: 'inventory' }">Inventory</router-link></li>
        <li><router-link :to="{ name: 'bags' }">Bag</router-link></li>
        <li><router-link :to="{ name: 'users' }">Users</router-link></li>
        <li><router-link :to="{ name: 'login' }">Login</router-link></li>
        <li class="nav-item-right"><a v-on:click.prevent="logout" href="#">Logout</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      const confirmation = confirm("คุณต้องการออกจากระบบหรือไม่?");
      if (confirmation) {
        this.$store.dispatch('setToken', null);
        this.$store.dispatch('setUser', null);
        this.$router.push({ name: 'login' });
      }
    }
  }
};
</script>

<style scoped>
.nv-navbar {
  background: linear-gradient(135deg, #ffdd59, #ffa502);
  width: 100%;
  padding: 15px 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.nv-navbar .nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nv-navbar .nav li {
  position: relative;
}

.nv-navbar .nav li a {
  padding: 10px 15px;
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  transition: color 0.3s ease, transform 0.3s ease;
}

.nv-navbar .nav li a:hover {
  color: #2f3542;
  transform: scale(1.05);
}

.nv-navbar .nav li a.router-link-active {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  color: #2f3542;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nv-navbar .nav li a::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background: #fff;
  transition: width 0.3s;
  position: absolute;
  bottom: -2px;
  left: 0;
}

.nv-navbar .nav li a:hover::after {
  width: 100%;
}

/* New CSS to move Logout to the right */
.nv-navbar .nav .nav-item-right {
  margin-left: auto;
}
</style>

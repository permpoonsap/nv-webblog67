<template>
    <div>
      <h1>Show Bag</h1>
      <p>ID: {{ bag.id }}</p>
      <p>Title: {{ bag.title }}</p>
      <p>Description: {{ bag.description }}</p>
      <p>Category: {{ bag.category }}</p>
      <p>Status: {{ bag.status }}</p>
      <p>
        <button v-on:click="navigateTo('/bag/edit/' + bag.id)">Edit Bag</button>
        <button v-on:click="navigateTo('/bags')">Back</button>
      </p>
    </div>
  </template>
  
  
  <script>
import BagsService from '@/services/BagsService';

export default {
  data() {
    return {
      bag: null
    };
  },
  async created() {
    try {
      let bagId = this.$route.params.bagId;
      this.bag = (await BagsService.show(bagId)).data;
    } catch (error) {
      console.log(error);
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
  </style>
  
<template>
    <div>
      <h2>Get all comments</h2>
      <h4>จำนวน comment: {{ comments.length }}</h4> <!-- Use a clearer label -->
      
      <div v-for="comment in comments" v-bind:key="comment.id">
        <p>id: {{ comment.id }}</p>
        <p>blog id: {{ comment.blogId }}</p>
        <p>comment: {{ comment.comment }}</p>
        <p>
          <button v-on:click="navigateTo('/comment/' + comment.id)">ดู comment</button>
          <button v-on:click="deleteComment(comment)">ลบข้อมูล</button>
        </p>
        <hr>
      </div>
    </div>
  </template>
  
  <script>
  import CommentsService from '@/services/CommentsService'
  
  export default {
    data () {
      return {
        comments: []
      }
    },
    async created () {
      // Fetch comments when the component is created
      try {
        const response = await CommentsService.index();
        this.comments = response.data; // Set the comments data
      } catch (error) {
        console.error("Failed to fetch comments:", error); // Improved error handling
      }
    },
    methods: {
      navigateTo (route) {
        this.$router.push(route)
      },
      async deleteComment (comment) {
        if (confirm("Are you sure you want to delete this comment?")) { // Confirm before deleting
          try {
            await CommentsService.delete(comment); // Delete comment using service
            this.refreshData(); // Refresh comments
          } catch (err) {
            console.error("Failed to delete comment:", err); // Improved error logging
          }
        }
      },
      async refreshData() {
        // Fetch comments again
        try {
          const response = await CommentsService.index();
          this.comments = response.data; // Update comments list
        } catch (error) {
          console.error("Failed to refresh comments:", error); // Improved error handling
        }
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  
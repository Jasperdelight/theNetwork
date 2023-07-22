<template>
  <div class="container-fluid">
    <section class="row justify-content-center">

      <h1>Found Posts</h1>
<div class="col-8" v-for="post in searchedPosts" :key="post.id">
    <PostCard :post="post"/>
  </div>

    </section>
  </div>

</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

export default {
  setup(){



    return {
      searchedPosts: computed(()=> AppState.searchedPosts),
      older: computed(()=> AppState.older),
      newer: computed(()=> AppState.newer),
      adds: computed(()=> AppState.adds)

    }
  }
}
</script>


<style lang="scss" scoped>

</style>
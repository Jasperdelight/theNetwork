<template>
  <div class="container-fluid">
    <section class="row justify-content-center">
      <h1>Found Posts</h1>
      <div class="d-flex justify-content-around">

<button class="btn btn-dark text-light" @click="changePage(older)" :disabled="!older">Previous</button>
<button class="btn btn-dark text-light" @click="changePage(newer) " :disabled="!newer">Next</button>
</div>
<p class="text-center">Page: {{ page }} {{ totalPages }}</p>
<div class="col-8" v-for="post in searchedPosts" :key="post.id">
    <PostCard :post="post"/>
  </div>
  
    </section>
    <div class="d-flex justify-content-around">

<button class="btn btn-dark text-light" @click="changePage(older)" :disabled="!older">Previous</button>
<button class="btn btn-dark text-light" @click="changePage(newer)" :disabled="!newer">Next</button>
</div>
  </div>

</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';

export default {
  setup(){



    return {
      searchedPosts: computed(()=> AppState.searchedPosts),
      older: computed(()=> AppState.older),
      newer: computed(()=> AppState.newer),
      adds: computed(()=> AppState.adds),
      searchedProfiles: computed(()=> AppState.searchedProfiles),
      page: computed(()=> AppState.page),
      totalPages: computed(()=> AppState.totalPages),



      async changePage(url){
        try{
            await postsService.changePage(url)
        } catch(error) {
            Pop.error(error.message);
            logger.log(error);
        }
      }

    }
  }
}
</script>


<style lang="scss" scoped>

</style>
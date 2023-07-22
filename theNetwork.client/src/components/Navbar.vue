<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black text-light px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img class="rounded" alt="logo" src="https://media2.giphy.com/media/QWMNhFtiHL9qAGyZkL/200w.webp?cid=ecf05e47agrjlfkj0a0cekwvrk7g05jrh0tvrkhn6srccqkd&ep=v1_gifs_search&rid=200w.webp&ct=g" height="45" />
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarText">
      
      <form @submit.prevent="searchProfiles()">
        <label for="searchProfile">searchProfile</label>
        <input v-model="editable.searchProfile" type="text" id="searchProfile">
        <button class="btn btn-success" type="submit">searchProfile</button>
      </form>
      <!-- <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link>
        </li>
      </ul> -->
      <form @submit.prevent="searchPosts()">
        <label for="search">search</label>
        <input v-model="editable.search" type="text" id="search">
        <button class="btn btn-success" type="submit">search</button>
      </form>
      <!-- LOGIN COMPONENT HERE -->
    </div>
    <Login />
  </nav>
</template>

<script>
import { ref } from 'vue';
import Login from './Login.vue';
import { router } from '../router.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
export default {
  setup() {
    const editable = ref({})


    return {
      editable,


      async searchPosts(){
        try{
          const searchQuery = editable.value.search
          logger.log(searchQuery)
          router.push(`/posts?query=${searchQuery}`)
            await postsService.searchPosts(searchQuery)
        } catch(error) {
            Pop.error(error.message);
            logger.log(error);
        }
      },

      async searchProfiles(){
        try{
            const searchQuery = editable.value.searchProfile
            logger.log('search profile query', searchQuery)
            router.push(`/profiles?query=${searchQuery}`)
            await postsService.searchProfiles(searchQuery)
        } catch(error) {
            Pop.error(error.message);
            logger.log(error);
        }
      }
      
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>

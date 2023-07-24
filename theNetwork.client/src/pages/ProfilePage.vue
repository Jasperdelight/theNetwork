<template>
  <h1>Profile Page</h1>

  <div class="container-fluid">
    <section class="row text-center" v-if="activeProfile">
      <div class="col-12 text-center">
        <img class="postImg" :src="activeProfile.coverImg" alt="">
      </div>
      <div class="col-12 text-center" >
         <h2>{{ activeProfile.name }}</h2>
         <img class="profilePic" :src="activeProfile.picture" alt="">
        </div>
        <div class="col-12">
          <div class=" text-center">
            <label style="font-weight: bold;" for="bio">Biography:</label>
            <p name="bio" id="bio">{{ activeProfile.bio }}</p>
          </div>
          <div>
            <label style="font-weight: bold;" for="graduated">Graduated:</label>
            <p name="graduated" id="graduated">{{ activeProfile.graduated }}</p>
          </div>
          <div>
            <label style="font-weight: bold;" for="class">Class:</label>
            <p name="class" id="class">{{ activeProfile.class }}</p>
          </div>
          
        <a v-if="activeProfile.linkedin" :href="activeProfile.linkedin"><i class="mdi mdi-linkedin fs-4"></i></a>
        
          <a v-if="activeProfile.github" :href="activeProfile.github"><i class="mdi mdi-github fs-4"></i></a>
        
        </div>


    </section>
  </div>
<section class="row justify-content-center">

  <div class="d-flex justify-content-around">
    
<button class="btn btn-dark text-light" @click="changeProfilePage(older)" :disabled="!older">Previous</button>
<button class="btn btn-dark text-light" @click="changeProfilePage(newer)" :disabled="!newer">Next</button>
</div>
<p v-if="page" class="text-center">Page: {{ page }} of {{ totalPages }}</p>
  <div class="col-md-8 col-12" v-for="post in activeProfilePosts" :key="post.id">
    <PostCard :post="post"/>
  </div>
<div class="d-flex justify-content-around">

<button class="btn btn-dark text-light" @click="changeProfilePage(older)" :disabled="!older">Previous</button>
<button class="btn btn-dark text-light" @click="changeProfilePage(newer)" :disabled="!newer" >Next</button>
</div>
</section>


</template>


<script>
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { computed, onMounted } from 'vue';
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState.js';

export default {
  setup(){

    const route = useRoute()

    async function getProfile(){
      try{
          const profileId = route.params.profileId
          // logger.log('profile id', profileId)
          await postsService.getProfile(profileId)
      } catch(error) {
          Pop.error(error.message);
          logger.log(error);
      }
    }

    async function getActiveProfilePosts(){
      try{
          const profileId = route.params.profileId
          await postsService.getActiveProfilePosts(profileId)
      } catch(error) {
          Pop.error(error.message);
          logger.log(error);
      }
    }

    onMounted(()=>{
      getProfile(),
      getActiveProfilePosts()
    })
    

    return {
      activeProfile: computed(()=> AppState.activeProfile),
      activeProfilePosts: computed(()=> AppState.activeProfilePosts),
      adds: computed(()=> AppState.adds),
      older: computed(() => AppState.older),
      newer: computed(() => AppState.newer),
      account: computed(()=> AppState.account),
      page: computed(()=> AppState.page),
      totalPages: computed(()=> AppState.totalPages),



      async changeProfilePage(url){
        try{
            await postsService.changeProfilePage(url)
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

.profilePic{
  height: 5vh;
  width: 5vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.postImg{
  height: 30vh;
  width: 50vh;
  object-fit: cover;
  object-position: center;
}
</style>
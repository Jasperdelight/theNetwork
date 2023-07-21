<template>
  <h1>Profile Page</h1>

  <div class="container-fluid">
    <section class="row" v-if="activeProfile">
      <div class="col-12 d-flex" >
         <h2>{{ activeProfile.name }}</h2>
         <img :src="activeProfile.picture" alt="">
        </div>
        <div class="col-12">
          <p>{{ activeProfile.bio }}</p>

          <a :href="activeProfile.linkedin"><i class="mdi mdi-linkedin"></i></a>
        
          <a :href="activeProfile.github"><i class="mdi mdi-github"></i></a>
        
        </div>


    </section>
  </div>


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

    onMounted(()=>{
      getProfile()
    })

    return {
      activeProfile: computed(()=> AppState.activeProfile)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
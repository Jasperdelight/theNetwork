<template>

  <div class="container-fluid">
    <section class="row justify-content-center">
      <h1>Found Profiles</h1>
<div class="col-8" v-for="profile in searchedProfiles" :key="profile.id">

  <div class="row ">
    <div class="elevation-3 col-12">
      <div class="row">
        <router-link :to="{name: 'Profile', params: {profileId: profile.id}}">
        <div class="col-12 p-2">

            <img class="img-fluid profilePic" :src="profile.picture" alt="">
            <p class="text-dark mb-0">
              {{ profile.name }}
              <!-- <span class="text-dark text-end">{{ profile.class }}</span> -->
            </p>
          </div>
        </router-link>
      
      </div>
    </div>
    <div>
      <img class="profileImg" :src="profile.imgUrl" alt="" data-bs-toggle="modal" data-bs-target="#projectModal" >
      {{ profile.body }}
    </div>
    </div>


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
      

      searchedProfiles: computed(()=> AppState.searchedProfiles),


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
  height: 20vh;
  width: 20vh;
  object-fit: cover;
  object-position: center;
}

</style>
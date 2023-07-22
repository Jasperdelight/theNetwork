<template>
  found profiles page 
  <div class="container-fluid">
    <section class="row justify-content-center">
<div class="col-8" v-for="profile in searchedProfiles" :key="profile.id">

  <div class="row elevation-3">
    <div class="card col-12">
      <div class="row justify-content-between">
        <div class="col-6">
          <router-link :to="{name: 'Profile', params: {profileId: profile.id}}">

            <img class="img-fluid profilePic" :src="profile.picture" alt="">
          </router-link>
        </div>
        <div class="col-6 text-end">
          {{ profile.name }}
          {{ profile.id }}
        </div>
      
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
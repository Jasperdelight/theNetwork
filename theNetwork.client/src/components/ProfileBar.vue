<template>
  <div class="container-fluid">
    <section class="row mt-4">
      <div class="col-12">
        <!-- Need to make active profile in appstate account or make new page -->
        <router-link @click="setAccountAsActive()" :to="{name: 'Profile', params: {profileId: account.id}}">

          <img :src="account.picture" alt="profilePic" class="profilePic">
</router-link>
      </div>
      <div class="col-12">
        <h5>{{ account.name }}</h5>
      </div>
      <div class="col-12 mb-4">
        <a :href="account.linkedin"><i  class="mdi mdi-linkedin selectable text-dark"></i> </a>
        <span>{{ account.class }}</span>
        <a :href="account.github"><i  class="mdi mdi-github selectable text-dark"></i> </a>

      </div>
    </section>
  </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { Post } from '../models/Post.js';
import { accountService } from '../services/AccountService.js';
export default {
  // props: {
  //   post: {type: Post, required: true}
  // },
  setup(){

    return {
      account: computed(()=> AppState.account),


      setAccountAsActive(){
        accountService.setAccountAsActive()
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

</style>
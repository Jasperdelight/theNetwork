<template>
  <div class="container-fluid">
    <section class="row mt-4">
      <div class="col-12">
        <img :src="account.picture" alt="profilePic" class="profilePic">
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

export default {
  setup(){
    return {
      account: computed(()=> AppState.account)
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
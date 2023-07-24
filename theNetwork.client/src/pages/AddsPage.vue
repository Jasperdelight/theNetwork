<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 mt-4">
        <img :src="addOne?.tall" alt="ad" class="img-fluid">
      </div>
      <div class="col-12 mt-4">
        <img :src="addFour?.tall" alt="ad" class="img-fluid">
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
      addOne: computed(()=>AppState.adds[0]),
      addTwo: computed(()=>AppState.adds[1]),
      addFour: computed(()=>AppState.adds[3])
    }
  }
}
</script>


<style lang="scss" scoped>
img{
  height: 50vh;
}

</style>
<template>
  <div class="container-fluid">
    <section class="row">

      <div class="col-12">
        <img :src="addTwo?.tall" alt="add" class="img-fluid">
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
      addTwo: computed(()=>AppState.adds[1])

    }
  }
}
</script>


<style lang="scss" scoped>

</style>
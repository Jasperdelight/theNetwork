<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
   <footer class="">
  </footer>

  <div class="modal fade" id="projectModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content" v-if="activePost">
      <div class="modal-header container">
        <div class="row">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ activePost.creator.name }}</h1>
        </div>
      </div>
      <div class="modal-body container">
        <section class="row">
          <div class="col-12">
            <img :src="activePost.imgUrl" alt="">
          </div>
          <div class="col-12">
            <p>{{ activePost.body }}</p>
          </div>

        </section>
  
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState),
    activePost: computed(()=> AppState.activePost
    )    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>

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
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link>
        </li>
      </ul>
      <form @submit.prevent="">
        <label for="search">search</label>
        <input v-model="editable.search" type="text" id="search">
        <button class="btn btn-success" type="submit">search</button>
      </form>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';
import Login from './Login.vue';
export default {
  setup() {
    const editable = ref({})


    return {
      editable
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

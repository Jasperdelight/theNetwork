<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="left">
      <AddsPage/>
    </div>
    <div class="main">
      <router-view />

    </div>
    
    <div class="right">
      <AddsPageTwo/>

    </div>
  </main>
   <footer class="">
  </footer>

  <div class="modal fade" id="postModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
<!-- EDIT MODAL -->
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content " v-if="activePost">
      <div class="modal-header container">
        <div class="row">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Post</h1>
        </div>
      </div>
      <div class="modal-body container">
        <section class="row">
          <div class="col-12">
            <form @submit.prevent="editPost()">
              <div>
                <label for="editPost">Edit Post</label>
                <input v-model="editable.body" type="text" name="editPost" id="editPost">
              </div>
              <div>
                <label for="imgUrl">imgUrl</label>
                <input v-model="editable.imgUrl" type="url" name="imgUrl" id="imgUrl">
              </div>
              <button class="btn btn-success" type="submit">Edit</button>

            </form>
          </div>
          <div class="col-12">
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
import { computed, ref, watchEffect } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import AddsPage from './pages/AddsPage.vue'
import AddsPageTwo from './pages/AddsPageTwo.vue'
import Pop from './utils/Pop.js'
import { logger } from './utils/Logger.js'
import { postsService } from './services/PostsService.js'
import { Modal } from 'bootstrap'

export default {
  setup() {
    const editable = ref({})

    watchEffect(()=>{
      editable.value = {...AppState.activePost}
    })


    return {
      editable,
      appState: computed(() => AppState),
    activePost: computed(()=> AppState.activePost),
    
    async editPost(){
    try{
        const postData = this.editable
        logger.log('POST DATA', postData)
        await postsService.editPost(postData)
        Modal.getOrCreateInstance('#editModal').hide()
    } catch(error) {
        Pop.error(error.message);
        logger.log(error);
    }
  }
  
  
  }
  },
  components: { Navbar, AddsPage, AddsPageTwo },
  

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

.top {
    height: 92px;
}
.left {
    width: 178px;
    float:left;
}
.right {
    width: 178px;
    float:right
}
.main {
  margin-left:178px;
  margin-right: 178px;
 }
</style>

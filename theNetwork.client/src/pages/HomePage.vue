<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-around">

<button class="btn btn-dark text-light" @click="changePage(older)" :disabled="!older">Older</button>
<button class="btn btn-dark text-light" @click="changePage(newer)">Newer</button>
</div>
<section class="row justify-content-center" >
  <div class="col-1" v-for="add in adds" :key="add.title">
<img class="addImg img-fluid" :src="add.tall" alt="">
  </div>


  <div class="col-8 text-center">
    <form @submit.prevent="createPost()">
      <div>
        <label for="newPost">Create Post</label>
        <textarea v-model="editable.body" name="newPost" id="newPost" cols="60" rows="5"></textarea>
      </div>
      <div>
        <label for="imgUrl">imgUrl</label>
        <input v-model="editable.imgUrl" type="url" name="imgUrl" id="imgUrl">
      </div>
    <button class="btn btn-success" type="submit">Post</button>
    </form>
      
  </div>
  <div class="col-2">
    
  </div>

  <div class="col-8" v-for="post in posts" :key="post.id">
    <PostCard :post="post"/>
  </div>
</section>
<div class="d-flex justify-content-around">

<button class="btn btn-dark text-light" @click="changePage(older)" :disabled="!older">Older</button>
<button class="btn btn-dark text-light" @click="changePage(newer)">Newer</button>
</div>
</div>
</template>

<script>
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import {postsService} from '../services/PostsService.js'
import {addsService} from '../services/AddsService.js'
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
export default {
  setup() {
    const editable = ref({})
    async function getAds(){
      try{
          await addsService.getAds()
      } catch(error) {
          Pop.error(error.message);
          logger.log(error);
      }
    }


    async function getPosts(){
      try{
          await postsService.getPosts()
      } catch(error) {
          Pop.error(error.message);
          logger.log(error);
      }}

      onMounted(()=> {
        getPosts();
        getAds();
      })


    return {
      editable,
      posts: computed(()=> AppState.posts),
      adds: computed(()=> AppState.adds),
      older: computed(() => AppState.older),
      newer: computed(() => AppState.newer),


      async createPost(){
        try{
            const postData = editable.value
            // logger.log('post data', postData)
            await postsService.createPost(postData)
            editable.value = {}
        } catch(error) {
            Pop.error(error.message);
            logger.log(error);
        }
      },

      async changePage(url){
        try{
            await postsService.changePage(url)
        } catch(error) {
            Pop.error(error.message);
            logger.log(error);
        }
      }

    }
  }
}
</script>

<style scoped lang="scss">
label{
  display: block;
}
.addImg{
  max-height: 50%;
}

</style>

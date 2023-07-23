<template>
  <div class="container-fluid">
<!-- 
<div class="row">
  <img class="addImg img-fluid" :src="addOne?.tall" alt="">
  <div class="col-2 tester" v-for="add in adds" :key="add.title">
  </div>
  
</div> -->
<section class="row justify-content-center" >


  <div v-if="account.id" class="col-md-8 col-12 text-center">
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

  <div class="d-flex justify-content-around">

<button class="btn btn-dark text-light" @click="changePage(older)" :disabled="!older">Previous</button>
<button class="btn btn-dark text-light" @click="changePage(newer)">Next</button>
</div>
<p v-if="page" class="text-center">Page: {{page}} of {{ totalPages }} </p>
  <div class="col-8" v-for="post in posts" :key="post.id">
    <PostCard :post="post"/>
  </div>
</section>
<div class="d-flex justify-content-around">

<button class="btn btn-dark text-light" @click="changePage(older)" :disabled="!older">Previous</button>
<button class="btn btn-dark text-light" @click="changePage(newer)">Next</button>
</div>
</div>
<!-- 
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content " v-if="activePost.id">
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
                <input v-model="editableTwo.body" type="text" name="editPost" id="editPost">
              </div>
              <div>
                <label for="imgUrl">imgUrl</label>
                <input v-model="editableTwo.imgUrl" type="url" name="imgUrl" id="imgUrl">
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
</div> -->
</template>

<script>
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import {postsService} from '../services/PostsService.js'
import {addsService} from '../services/AddsService.js'
import { computed, onMounted, ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
export default {
  setup() {
    const editable = ref({})
    const editableTwo = ref({})

    watchEffect(()=>{
      editableTwo.value = {...AppState.activePost} 
    })

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
      editableTwo,
      posts: computed(()=> AppState.posts),
      adds: computed(()=> AppState.adds),
      older: computed(() => AppState.older),
      newer: computed(() => AppState.newer),
      account: computed(()=> AppState.account),
      addOne: computed(()=> AppState.adds[0]),
      addTwo: computed(()=> AppState.adds[1]),
      page: computed(()=> AppState.page),
      totalPages: computed(()=> AppState.totalPages),

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
height: 50vh;
width: 15vh;
}


</style>

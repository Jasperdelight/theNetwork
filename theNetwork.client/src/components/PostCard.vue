<template>
  <div class="row elevation-3 mb-3 rounded">
    <div class=" col-12">
      <div class="row justify-content-between">
        <div class="col-6">
          <router-link :to="{name: 'Profile', params: {profileId: post.creatorId}}">

            <img class="img-fluid profilePic" :src="post.creator.picture" alt="">
          </router-link>
          {{ post.creator.name }}
        </div>
        <div class="col-6 text-start">
        </div>
      </div>
    </div>
<div class="mt-2 text-center">
  <img class="postImg selectable" :src="post.imgUrl" alt="" data-bs-toggle="modal" data-bs-target="#postModal" @click="setActivePost()">

</div>
    <div class="mt-2">
    <p class="text-center">
        {{ post.body }}
      </p>
    </div>
    <div class="row">
      <div class="col-12">
        <section class="row">
          <div class="col-6">
            <span class="pe-2">{{ formatDate(post.createdAt) }}</span>
            <div>

              <button v-if="account.id == post.creatorId" @click="deletePost()" class="btn btn-outline-danger me-2">delete</button>
              <button @click="setActivePost()" v-if="account.id == post.creatorId" data-bs-toggle="modal" data-bs-target="#editModal" class="btn btn-outline-success ">Edit</button>
            </div>
          </div>
          <div class="col-6">
        <div class="text-end">{{ post.likes.length }}
          <i v-if="!account.id" class="mdi mdi-thumb-up text-end"></i>
          <i v-if="account.id" @click="likePost()" class="mdi mdi-thumb-up text-end selectable"></i>
        </div>
          </div>
        </section>


      </div>
      <div class="col-12 d-flex justify-content-center">
        

      </div>
    </div>
  </div>
    
</template>


<script>
import { useRoute } from 'vue-router';
import { Post } from '../models/Post.js';
import { postsService } from '../services/PostsService.js';
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';

export default {
  props: {
    post: {type: Post, required: true}
  },
  setup(props){
    // const route = useRoute()

    return {

      account: computed(()=> AppState.account),



      setActivePost(){
        postsService.setActivePost(props.post)
      },
      
      async likePost(){
        await postsService.likePost(props.post)
      },
      async deletePost(){
        try{
          const wantsToRemove = await Pop.confirm('are you sure you want to delete?')
          if (!wantsToRemove) {
            return
          }
          await postsService.deletePost(props.post)
          
        } catch(error) {
            Pop.error(error.message);
            logger.log(error);
        }
      },

      formatDate(createdAt){
        const date = new Date(createdAt)
        const dateFormat = {
          dateStyle: 'short',
          timeStyle: 'short'
        }
        return date.toLocaleString(undefined, dateFormat)
      },
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
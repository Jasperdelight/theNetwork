<template>
  <div class="row elevation-3 mb-3">
    <div class="card col-12">
      <div class="row justify-content-between">
        <div class="col-6">
          <router-link :to="{name: 'Profile', params: {profileId: post.creatorId}}">

            <img class="img-fluid profilePic" :src="post.creator.picture" alt="">
          </router-link>
        </div>
        <div class="col-6 text-end">
          {{ post.creator.name }}
        </div>
      </div>
    </div>

    <div class="mt-2">
      <img class="postImg selectable" :src="post.imgUrl" alt="" data-bs-toggle="modal" data-bs-target="#projectModal" @click="setActivePost()">
      <p class="">
        {{ post.body }}
      </p>
    </div>
    <div class="row">
      <div class="col-12">
        <section class="row">
          <div class="col-6">
            <span class="pe-2">{{ formatDate(post.createdAt) }}</span>
            <button v-if="account.id == post.creatorId" @click="deletePost()" class="btn btn-danger ">delete</button>
          </div>
          <div class="col-6">
        <div class="text-end">{{ post.likes.length }}
          <i @click="likePost()" class="mdi mdi-thumb-up text-end selectable"></i>
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
        await postsService.deletePost(props.post)
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
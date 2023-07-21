<template>
  <div class="row elevation-3">
    <div class="card col-12">
      <div class="row justify-content-between">
        <div class="col-6">
          <!-- <router-link :to="{name: 'Profile', params: {profileId: post.creatorId}}">

          </router-link> -->
            <img class="img-fluid avatar" :src="post.creator.picture" alt="">
        </div>
        <div class="col-6 text-end">
          {{ post.creator.name }}
        </div>
      
      </div>
    </div>
    <div>
      <img class="postImg selectable" :src="post.imgUrl" alt="" data-bs-toggle="modal" data-bs-target="#projectModal" @click="setActivePost()">
      {{ post.body }}
    </div>
    <div class="row">
      <div class="col-12">
        <div class="text-end">{{ post.likes.length }}
          <i @click="likePost()" class="mdi mdi-thumb-up text-end selectable"></i>
        </div>

      </div>
    </div>
  </div>
    
</template>


<script>
import { Post } from '../models/Post.js';
import { postsService } from '../services/PostsService.js';

export default {
  props: {
    post: {type: Post, required: true}
  },
  setup(props){
    return {

      setActivePost(){
        postsService.setActivePost(props.post)
      },
      
      async likePost(){
        await postsService.likePost(props.post)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.avatar{
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
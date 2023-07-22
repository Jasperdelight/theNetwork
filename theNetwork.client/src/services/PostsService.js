import { AppState } from "../AppState.js"
import { Account } from "../models/Account.js"
import { Post } from "../models/Post.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    // logger.log('posts?', res.data)
    const posts = res.data.posts.map(p => new Post(p))
    AppState.posts = posts
    AppState.newer = res.data.older
    AppState.older = res.data.newer
    // logger.log('posts in the Appstate', AppState.posts)
  }
  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    logger.log('created post', res.data)
    const post = new Post(res.data)
    AppState.posts.unshift(post)

  }
  setActivePost(post) {
    AppState.activePost = post
    // logger.log(AppState.activePost)
  }
  async likePost(post) {
    const postId = post.id
    // logger.log('post data in service', postId)
    const res = await api.post(`api/posts/${postId}/like`)
    logger.log('post liked', res.data)
    const likedPost = new Post(res.data)
    const index = AppState.posts.findIndex((p) => p.id == postId);
    if (index !== -1) {
      AppState.posts.splice(index, 1, likedPost);
    } else {
      AppState.posts.push(likedPost);
    }
  }
  async deletePost(post) {
    const postId = post.id
    logger.log('[deleted post id]', postId)
    const res = await api.delete(`api/posts/${postId}`)
    logger.log('post being deleted,', res.data)
    const postIndex = AppState.posts.findIndex((p) => p.id == postId)
    AppState.posts.splice(postIndex, 1)
  }
  async changePage(url) {
    const res = await api.get(url)
    const newPosts = res.data.posts.map(p => new Post(p))
    AppState.posts = newPosts
    AppState.newer = res.data.older
    AppState.older = res.data.newer
  }
  async changeProfilePage(url) {
    const res = await api.get(url)
    const newPosts = res.data.posts.map(p => new Post(p))
    AppState.activeProfilePosts = newPosts
    AppState.newer = res.data.older
    AppState.older = res.data.newer
  }

  async getProfile(profileId) {
    const res = await api.get(`api/profiles/${profileId}`)
    // logger.log(res.data)
    const gotProfile = new Account(res.data)
    AppState.activeProfile = gotProfile
    // logger.log('profile in appstate', AppState.activeProfile)
  }
  async getActiveProfilePosts(profileId) {
    const res = await api.get(`api/profiles/${profileId}/posts`)
    logger.log('found posts,', res.data)
    const foundPosts = res.data.posts.map(p => new Post(p))
    AppState.activeProfilePosts = foundPosts
    AppState.newer = res.data.older
    AppState.older = res.data.newer
  }

  async searchPosts(searchQuery) {
    const res = await api.get(`api/posts?query=${searchQuery}`)
    // logger.log('search results?', res.data)
    const foundPosts = res.data.posts.map(fp => new Post(fp))
    AppState.searchedPosts = foundPosts
  }

  async searchProfiles(searchQuery) {
    const res = await api.get(`api/profiles?query=${searchQuery}`)
    logger.log('search results?', res.data)
    const foundProfiles = res.data.map(fp => new Profile(fp))
    AppState.searchedProfiles = foundProfiles
  }

}
export const postsService = new PostsService()
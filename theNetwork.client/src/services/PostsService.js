import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    logger.log('posts?', res.data)
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
    logger.log('post liked', res)
  }
  async changePage(url) {
    const res = await api.get(url)
    const newPosts = res.data.posts.map(p => new Post(p))
    AppState.posts = newPosts
    AppState.newer = res.data.older
    AppState.older = res.data.newer
  }


}
export const postsService = new PostsService()
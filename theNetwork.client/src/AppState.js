import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Post.js').Post[]} */
  posts: [],
  /** @type {import('./models/Post.js').Post[]} */
  searchedPosts: [],
  /** @type {import('./models/Post.js').Post|null} */
  activePost: null,
  /** @type {import('./models/Add.js').Add[]} */
  adds: [],
  newer: null,
  older: null,
  /** @type {import('./models/Profile.js').Profile|null} */
  activeProfile: null,
  /** @type {import('./models/Profile.js').Profile[]} */
  searchedProfiles: [],
  /** @type {import('./models/Post.js').Post[]} */
  activeProfilePosts: [],

  page: null,
  totalPages: null
})

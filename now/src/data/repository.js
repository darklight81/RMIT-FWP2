import axios from "axios"

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000"
const USER_KEY = "user"

// --- User ---------------------------------------------------------------------------------------
const USER_ENDPOINT = "/api/users/"

async function verifyUser(username, password) {
  const response = await axios.post(API_HOST + USER_ENDPOINT + "login", { username, password });
  const user = response.data

  if (user !== null)
    setUser(user)

  return user
}

async function fetchUsers() {
  const response = await axios.get(API_HOST + USER_ENDPOINT)
  return response.data
}

async function fetchUser(id) {
  const response = await axios.get(API_HOST + USER_ENDPOINT + id)
  return response.data
}

async function fetchUserByUsername(username) {
  const response = await axios.get(API_HOST + USER_ENDPOINT + "select/" + username)
  return response.data
}

async function fetchPostsByUser(id) {
  const response = await axios.get(API_HOST + USER_ENDPOINT + id + "/posts")
  return response.data
}

async function createUser(user) {
  const response = await axios.post(API_HOST + USER_ENDPOINT, user)
  return response.data
}

async function addUser(user) {
  try {
    const response = await createUser(user)
    setUser(response)
  } catch (error) {
    return false
  }

  return true
}

async function deleteUser(id) {
  const response = await axios.delete(API_HOST + USER_ENDPOINT + id)
  return response.data
}

export async function editUser(user) {
    const response = await axios.put(API_HOST + USER_ENDPOINT + user.userId, user)
    return response.data
}

// --- Post ---------------------------------------------------------------------------------------
const POST_ENDPOINT = "/api/posts/"

async function fetchPosts() {
  const response = await axios.get(API_HOST + POST_ENDPOINT)
  return response.data
}

async function fetchPost(id) {
  const response = await axios.get(API_HOST + POST_ENDPOINT + id)
  return response.data
}

async function fetchComments(id) {
  const response = await axios.get(API_HOST + POST_ENDPOINT + id + "/comments")
  return response.data
}

async function fetchReactions(id) {
  const response = await axios.get(API_HOST + POST_ENDPOINT + id + "/reactions")
  return response.data
}

async function addReaction(id, reaction) {
  const response = await axios.post(API_HOST + POST_ENDPOINT + id + "/reactions", reaction)
  return response.data
}

async function removeReaction(id, userId) {
  const response = await axios.delete(API_HOST + POST_ENDPOINT + id + "/reactions/" + userId)
  return response.data
}

async function createPost(post) {
  const response = await axios.post(API_HOST + POST_ENDPOINT, post)
  return response.data
}

async function updatePost(id, post) {
  const response = await axios.put(API_HOST + POST_ENDPOINT, post)
  return response.data
}

async function deletePost(id) {
  const response = await axios.delete(API_HOST + POST_ENDPOINT + id)
  return response.data
}

// --- Comment ------------------------------------------------------------------------------------
const COMMENT_ENDPOINT = "/api/comments/"

async function fetchReplies(id) {
  const response = await axios.get(API_HOST + COMMENT_ENDPOINT + id)
  return response.data
}

async function createComment(comment) {
  console.log(comment)
  const response = await axios.post(API_HOST + COMMENT_ENDPOINT, comment)
  return response.data
}

async function deleteComment(id) {
  const response = await axios.delete(API_HOST + COMMENT_ENDPOINT + id)
  return response.data
}

// --- Friendship ---------------------------------------------------------------------------------
const FRIENDSHIP_ENDPOINT = "/api/friendships/"

async function createFriendship(followerId, followingId) {
  const data = {
    'followerId' : followerId,
    'followingId' : followingId
  }

  const response = await axios.post(API_HOST + FRIENDSHIP_ENDPOINT, data)
  return response.data
}

// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY))
}

function removeUser() {
  localStorage.removeItem(USER_KEY)
}

export {
  // User
  verifyUser,
  fetchUsers,
  fetchUser,
  fetchUserByUsername,
  fetchPostsByUser,
  createUser,
  deleteUser,
  addUser,

  // Post
  fetchPosts,
  fetchPost,
  fetchComments,
  fetchReactions,
  addReaction,
  removeReaction,
  createPost,
  deletePost,

  // Comment
  fetchReplies,
  createComment,
  deleteComment,

  // Friendship
  createFriendship,

  // Local Storage
  setUser,
  getUser,
  removeUser
}

/*
 * Parts of this code are adapted from weekly material.
 *   - Week 2 Example 6
 *     basic-login-logout-with-localstorage-using-functions-example
 *   - Week 5 Activity 1
 *     insert-and-update-localstorage-example
 *   - Week 8 Lectorial Example 3
 *     registration-login-logout-post-with-database-example
*/

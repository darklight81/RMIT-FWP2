import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'

import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost
} from '../data/repository';

const ADD = "ADD"
const EDIT = "EDIT"
const DELETE = "DELETE"

function postsReducer(state, action) {
  switch(action.type) {
    case ADD:
      return [...state, action.payload.post]
    case EDIT:
      return state.map((post, i) => {
        if (i === action.payload.postId)
          return { ...post, body: action.payload.body }

        return state
      })
    case DELETE:
      return state.filter((_, i) => action.payload.postId !== i)
    default:
      return state
  }
}

function addAction(post) {
  return {
    type: ADD,
    payload: {
      post: post
    }
  }
}

function editAction(postId, body) {
  return null
}

async function delPost(postId) {
  await deletePost(postId)
}

function deleteAction(postId) {
  delPost(postId)

  return {
    type: DELETE,
    payload: {
      postId
    }
  }
}

const postContext = createContext(null)
const PostProvider = ({ children }) => {
  const [posts, dispatch] = useReducer(postsReducer, [])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getPosts() {
      const snapshot = await fetchPosts()
      snapshot.forEach(post => dispatch(addAction(post)))
      setIsLoading(false)
    }

    getPosts()
  }, [])

  return (
    <postContext.Provider value={{ posts, isLoading, dispatch }}>
      {children}
    </postContext.Provider>
  )
}

const usePosts = () => {
  const context = useContext(postContext)

  if (context === undefined) {
    throw new Error("usePost was used outside of its Provider.")
  }

  return context
}

export default PostProvider
export {
  usePosts,
  addAction,
  editAction,
  deleteAction
}

/*
 * Parts of this code are adapted from weekly and online material.
 *  - Week 6 Example 4
 *    useReducer and useContext
 */

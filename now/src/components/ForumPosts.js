import { usePosts } from "../contexts/postContext"
import Posts from "./Posts"

function ForumPosts() {
  const { posts, isLoading } = usePosts()
  return <Posts posts={posts} isLoading={isLoading} />
}

export default ForumPosts

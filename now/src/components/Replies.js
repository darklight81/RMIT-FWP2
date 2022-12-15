import { CircularProgress, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { fetchReplies } from "../data/repository"
import Comment from "./Comment"

function Replies({ parentId }) {
  const [replies, setReplies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getReplies() {
      try {
        const snapshot = await fetchReplies(parentId)
        setReplies(snapshot)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }
    
    getReplies()
  }, [])

  return (
    <>
      {isLoading ? <CircularProgress size={5} pl={8} isIndeterminate /> : (
        replies.length > 0 && 
          <VStack pl={4} spacing={3}>
            {replies.map((reply) => 
              <Comment key={reply.commentId} comment={reply} />
            )}
          </VStack>
      )}
    </>
  )
}

export { Replies }

import { memo, useEffect, useState } from 'react';

import { useUser } from '../contexts/userContext';
import {createComment, fetchComments} from '../data/repository';

import Comment from './Comment';
import { Avatar, Button, CircularProgress, HStack, Input, Text, VStack } from '@chakra-ui/react';

function Comments({ parentId }) {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getComments() {
      const snapshot = await fetchComments(parentId)
      setComments(snapshot)
      setIsLoading(false)
    }

    getComments()
  }, [])

  return (
    <>
      {isLoading ? <CircularProgress isIndeterminate /> : (
        comments.length > 0 &&
          <VStack p={3}>
            {comments.map((comment) => <Comment key={comment.commentId} comment={comment} />)}
            <Text w="100%" color="blackAlpha.600">View all {comments.length} comments</Text>
          </VStack>
      )}
    </>
  )
}

const CreateComment = memo(function CommentForm(parentId) {
  const { user, name } = useUser();
  const [body, setBody] = useState("");
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getComments() {
      const snapshot = await fetchComments(parentId.parentId)
      setComments(snapshot)
      setIsLoading(false)
    }

    getComments()
    }, [])
  async function handleSubmit(event) {
    event.preventDefault()
    if (body.length > 0 && body.length <= 250) {
      const userId = user.userId
      const tmpParentId = parentId.parentId
      const comment = {
        body,
        postId: tmpParentId,
        authorId: userId
      };

      await createComment(comment).then(r => console.log(r))
      console.log(comments)
      setComments(...comments, comment)
      console.log(comments)
      setBody("")
    }
  }

  return (
    <form style={{width: "100%"}} onSubmit={handleSubmit}>
      <HStack p={3}>
        <Avatar
          size="sm"
          name={name}
          src={user.src}
        />
        <Input
          size="sm"
          borderRadius={24}
          type="text"
          name="body"
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Add a comment..."
          autoComplete="off"
        />
        <Button
          p={2}
          size="sm"
          variant="ghost"
          colorScheme="blue"
          type="submit"
        >Post</Button>
      </HStack>
    </form>
  )
})

export default Comments;
export { CreateComment }

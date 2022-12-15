import { Text, HStack, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useUser } from '../contexts/userContext'
import { addReaction } from '../data/repository'

const REACTION = {
  LIKE: "👍",
  LOVE: "❤️",
  LAUGH: "😆",
  WOW: "😯",
  CRY: "😥",
  ANGRY: "😡",
}

function Reactions({ postId }) {
  const reactions = Object.values(REACTION)

  return (
      <HStack spacing={3}>
        {reactions.map((type, i) =>
            <Reaction key={i} type={type} postId={postId} />
        )}
      </HStack>
  )
}

function Reaction({ type, postId }) {
  const { user } = useUser()
  const { userId } = user

  const [isHover, setIsHover] = useState(false)

  const reactionStyle = {
    transform: isHover ? 'scale(1.5)' : 'scale(1)',
    transformOrigin: 'bottom',
    transition: 'transform 0.05s ease-in-out',
    cursor: 'pointer',
  }

  async function react() {
    await addReaction(postId, {
      postId: postId,
      userId: userId,
      type: type
    })
  }

  return (
      <Button
          variant="unstyled"
          fontSize="2xl"
          style={reactionStyle}
          type="submit"
          onClick={() => react()}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
      >
        {type}
      </Button>
  )
}

export default Reactions

/**
 * References
 *   - https://stackabuse.com/how-to-style-hover-in-react/
 */

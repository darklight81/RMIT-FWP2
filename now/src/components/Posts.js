import Post from './Post';
import { CircularProgress, Text, VStack } from '@chakra-ui/react';

const NoPosts = () => <Text m={3} color="blackAlpha.600">There's nothing here yet. Make a post!</Text>

function Posts({ posts, isLoading }) {
  return (
    <VStack w="100%" spacing={4}>
      {isLoading ? <CircularProgress isIndeterminate /> : (
        posts !== null && posts.length > 0
          ? posts.map((post, i) =>
              <Post key={i} post={post}/>
            ).reverse()
          : <NoPosts />
      )}
    </VStack>
  )
}

export default Posts;

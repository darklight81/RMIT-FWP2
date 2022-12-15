import { usePosts } from '../contexts/postContext';

import Page from './Page';
import Posts from './Posts';
import { CreatePost } from './CreatePost';
import { Divider, VStack } from '@chakra-ui/react';

function Forum() {
  const { posts, isLoading } = usePosts()

  return (
    <Page mx={4}>
      <VStack w="100%" maxW="xl" spacing={4}>
        <CreatePost />
        <Divider />
        <Posts posts={posts} isLoading={isLoading} />
      </VStack>
    </Page>
  )
}

export default Forum;

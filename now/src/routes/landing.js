import Page from '../components/Page';
import { ArrowDownIcon } from '@chakra-ui/icons';
import { Avatar, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';

function Landing() {
  return (
    <Page align="center">
      <VStack style={{perspective: "500px"}} maxW="3xl" spacing={10}>
        <VStack 
          zIndex={1} 
          pb={20}
          bg="linear-gradient(0deg, transparent, white, white);"
        >
          <Heading fontWeight="normal" size="3xl" align="center">Loop Agile / <b>Now</b></Heading>
          <Heading fontSize="7xl" lineHeight={1} align="center">The new home for our team's posts!</Heading>
        </VStack>

        <PostsDemo 
          zIndex={0}
          transform="rotateX(25deg) scale(0.8)"
          marginTop="-12rem"
          marginBottom="-7rem"
          userSelect="none"
        />

        <HStack 
          zIndex={1}
          pt={20}
          px={20}
          spacing={3}
          bg="radial-gradient(white, white 15%, transparent)"
        >
          <Button 
            size="lg" 
            leftIcon={<ArrowDownIcon />}
          >Read more
          </Button>

          <Button 
            size="lg" 
            colorScheme="messenger"
            boxShadow="2xl"
            bg="linear-gradient(0deg, rgba(0, 120, 255, 1), rgba(0, 120, 255, 0.8))"
          >Get an account
          </Button>
        </HStack>

        {/* TODO: Add "How to use" section */}
      </VStack>
    </Page>
  );
}

function PostsDemo(props) {
  return (
    <VStack style={props} spacing={4}>
      <PostDemo 
        name="Jasmine T"
        body="Loving the progress on this assignment everyone! It's really coming along. ✨👏👏"/>
      <PostDemo 
        name="Kevin"
        body="Shout out to Steve for the Friday demo. Blew it out of the park!"/>
      <PostDemo 
        name="Steve" 
        body="Could someone help me with the backend for this project? I keep getting stuck trying to implement the UI. Thanks 🙏🙏"/>
    </VStack>
  )
}

function PostDemo({ name, body }) {
  return (
    <VStack p={4} w={400} bg="white" borderWidth={1} borderRadius={12}>
      <HStack align="flex-start" spacing={6}>
        <Avatar name={name} />
        <VStack align="flex-start">
          <Text fontSize="2xl">{name}</Text>
          <Text fontSize="xl">{body}</Text>
        </VStack>
      </HStack>
    </VStack>
  )
}

export default Landing;

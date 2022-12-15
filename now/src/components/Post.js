import { Link } from 'react-router-dom';

import { useUser } from '../contexts/userContext';
import { createFriendship } from '../data/repository';

import Reactions from './Reactions';
import Comments, { CreateComment } from './Comments';
import { Avatar, Button, ButtonGroup, Divider, HStack, IconButton, Image, Spacer, Text, VStack } from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {deleteAction, usePosts} from "../contexts/postContext";

function Post({ post }) {
  const { postId, user, body, createdAt } = post

  return (
    <VStack
      w="100%"
      borderWidth={1}
      borderRadius={8}
      align="left"
      spacing={0}
      aria-label="mypost"
    >
      <PostHead id={postId} author={user}/>
      <Divider />
      <PostBody body={body} />
      <Divider />
      <HStack px={3} py={2}>
          <Reactions postId={postId} />
          <Spacer />
        <Text>{createdAt}</Text>
      </HStack>
      <Comments parentId={postId} />
      <CreateComment parentId={postId} />
    </VStack>
  )
}

function PostHead({ id, author }) {
  const { userId, firstname, lastname, username, avatarUrl } = author
  const name = (firstname || lastname)
    ? firstname + " " + lastname
    : username

  return (
    <HStack p={3} spacing={3}>
      <Link
        to={author.username}
        key={author.username}
      >
        <HStack spacing={3}>
          <Avatar
            size="sm"
            name={name}
            src={avatarUrl}
          />
          <Text>{name}</Text>
        </HStack>
      </Link>
      <Spacer />
      <Actions
        id={id}
        authorId={userId}
      />
    </HStack>
  )
}

function PostBody({ body, src }) {
  return (
    src
      ? <>
          {body && <Text p={4} w="100%">{body}</Text>}
          <Image src={src} />
        </>
      : <>
          <VStack p={6} w="100%" minHeight="3xs" bg="gray.50" justify="center">
            <Text p={4} w="100%" fontSize="4xl" align="center">{body}</Text>
          </VStack>
        </>
  )
}

function Actions({ id, authorId }) {
  const { user } = useUser()

  const followUser = (followingId) => {
    createFriendship(user.userId, followingId)
  }

  return (
    user.userId === authorId
      ? <ButtonGroup>
          <ActionButton
            id={id}
            // action={editAction}
            icon={<EditIcon />}
          />
          <ActionButton
            id={id}
            action={deleteAction}
            icon={<DeleteIcon />}
            colorScheme="red"
          />
        </ButtonGroup>
      : <Button
          size="xs"
          variant="outline"
          leftIcon={<AddIcon h={2.5} />}
          onClick={() => followUser(authorId)}
        >Follow</Button>
  )
}

function ActionButton({ id, action, ...attributes }) {
  const { icon, colorScheme, buttonText } = attributes;
   const { dispatch } = usePosts();

  return (
    buttonText
      ? <Button
          size="xs"
          variant="outline"
          colorScheme={colorScheme}
          leftIcon={icon}
           onClick={() => dispatch(action(id)) }
        >{buttonText}</Button>
      : <IconButton
          size="xs"
          pl={2}
          variant="outline"
          colorScheme={colorScheme}
          leftIcon={icon}
          onClick={() => dispatch(action(id)) }
        />
  )
}

export default Post;

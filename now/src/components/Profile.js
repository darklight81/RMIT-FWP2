import { useEffect, useState } from "react";

import { fetchPostsByUser } from "../data/repository";

import {AtSignIcon, TimeIcon} from "@chakra-ui/icons";
import { Avatar, Divider, Heading, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import ConfirmDeleteAlert from "./ConfirmDeleteAlert";
import EditModal from "./EditModal";
import Posts from "./Posts";

function Profile({ user }) {
  const {
    userId,
    username,
    firstname,
    lastname,
    email,
    createdAt,
    bio,
    avatarUrl
  } = user

  const name = (firstname || lastname)
    ? firstname + " " + lastname
    : username

  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getPosts() {
      const snapshot = await fetchPostsByUser(userId)
      setPosts(snapshot)
      setIsLoading(false)
    }

    getPosts()
  }, [])

  return (
    <VStack w="100%" maxW="lg" align="flex-start" spacing={3}>
        <Avatar
          size="xl"
          name={name}
          src={avatarUrl}
        />

        <Text fontSize="3xl" fontWeight="bold">
          {name ?? "No user name."}
        </Text>

        <HStack
          py={2}
          px={3}
          mx="-0.5rem !important"
          bg="blackAlpha.100"
          borderRadius={12}
          spacing={3}
        >
          <HStack>
            <AtSignIcon color="blackAlpha.800" />
            <Text color="blackAlpha.800">
              {username ? username : "No email address."}
            </Text>
          </HStack>
          <HStack>
            <TimeIcon color="blackAlpha.800" />
            <Text color="blackAlpha.800">
              {createdAt ? createdAt : "No join date."}
            </Text>
          </HStack>
        </HStack>

        {bio
          ? <Text>{bio}</Text>
          : <Text userSelect="none" color="blackAlpha.600">There's nothing here. Add something to your bio.</Text>
        }

        <HStack mt="1.5rem !important" w="100%">
          <Spacer />
          <EditModal />
          <ConfirmDeleteAlert />
        </HStack>

        <Divider />
        <Heading size="sm">{user.firstname}'s posts:</Heading>
        <Posts posts={posts} isLoading={isLoading} />
      </VStack>
  )
}

export default Profile;

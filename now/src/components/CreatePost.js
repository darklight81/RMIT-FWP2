import { EditIcon } from "@chakra-ui/icons";
import { Avatar, HStack, IconButton, Image, Input, VStack } from "@chakra-ui/react";
import { memo, useState } from "react";
import { addAction, usePosts } from "../contexts/postContext";
import { useUser } from "../contexts/userContext";
import {createPost, fetchUser} from "../data/repository";

const CreatePost = memo(function PostForm() {
  const { user, name } = useUser()
  const { dispatch } = usePosts()
  const { userId } = user

  const [body, setBody] = useState("")
  const [file, setFile] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault();
    const isValidPost = (
      body.length > 0 &&
      body.length <= 600
    )

    if (isValidPost) {
      let post = await createPost({
        authorId: userId,
        body: body
      })

      const user = await fetchUser(userId)
      post = { ...post, user }

      dispatch(addAction(post))
      setBody("")
      setFile(null)
    }
  }

  async function handleFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      setFile(URL.createObjectURL(event.target.files[0]))
    }
  }

  return (
    <form style={{width: "100%"}} onSubmit={handleSubmit}>
      <VStack>
        <HStack
          w="100%"
          p={3}
          borderWidth={1}
          borderRadius={12}
          boxShadow="sm"
          spacing={3}
        >
          <Avatar
            w="2.5rem"
            h="2.5rem"
            name={name}
            src={user.src}
          />
          <Input
            bg="white"
            borderWidth={1}
            type="text"
            name="body"
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder={`What's on your mind, ${user.firstname}?`}
            autoComplete="off"
            autoFocus
          />
          <IconButton
            type="submit"
            size="lg"
            h="2.45rem"
            pl={0}
            icon={<EditIcon />}
            variant="ghost"
            colorScheme="messenger"
          />
        </HStack>
        {file && <Image w="100%" src={file} />}
      </VStack>
      <Input
        mt={3}
        border="none"
        name="file"
        type="file"
        multiple={false}
        onChange={handleFile}
      />
    </form>
  )
})

export { CreatePost }

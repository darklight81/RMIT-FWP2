import { ChatIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Input } from "@chakra-ui/react";
import {useContext, useState} from "react";
import {createComment} from "../data/repository";
import {userContext} from "../contexts/userContext";

function ReplyForm(authorComment) {
  const [body, setBody] = useState()
  const loggedUser = useContext(userContext).user;

  const handleSubmit = (e) => {

    e.preventDefault()
    if (body.length <= 0 || body.length > 250)
      return

    //quick fix
    let oldComment = authorComment.comment
    if (oldComment === undefined)
        oldComment = authorComment.authorComment

    const comment ={
        body,
        postId: oldComment.postId,
        authorId: loggedUser.userId,
        parentId: oldComment.commentId
    }
    setBody("")
    createComment(comment);
  }

  return (
    <form style={{width: "100%"}} onSubmit={handleSubmit}>
      <HStack>
        <Input
          size="sm"
          borderRadius={24}
          type="text"
          name="body"
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Write a reply..."
          autoComplete="off"
          autoFocus
        />
        <IconButton
          p={2}
          size="sm"
          variant="ghost"
          colorScheme="blue"
          icon={<ChatIcon />}
          type="submit"
          data-testid="reply-btn"
        />
      </HStack>
    </form>
  )
}

export { ReplyForm }

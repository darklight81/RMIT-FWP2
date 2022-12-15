import { CloseIcon } from '@chakra-ui/icons';
import { Button, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import {useContext, useState} from 'react';
import { Replies } from './Replies';
import { ReplyForm } from './ReplyForm';
import {userContext} from "../contexts/userContext";
import CommentButtons from "./CommentButtons";

function Comment({ comment }) {
    const loggedUser = useContext(userContext).user;
    const [replyFormIsVisible, setReplyFormIsVisible] = useState(false)

    const { commentId, createdAt, user } = comment;
    const { username, firstname, lastname } = user;
    const name = (firstname && lastname)
        ? firstname + " " + lastname
        : username

    const createdAtFormat = new Date(createdAt).toLocaleTimeString()
    return (
        loggedUser.username === username ?
            <VStack p={0.5} w="100%" align="left">
                <Text>
                    <Text
                        as="span"
                        fontWeight="semibold"
                    >{name}</Text>{' '}
                    {comment.body}
                </Text>
                <HStack>
                    <Text fontSize="sm">{createdAtFormat}</Text>
                    <Button
                        size="sm"
                        variant="unstyled"
                        color="gray.600"
                        onClick={() => setReplyFormIsVisible(true)}
                    >Reply</Button>
                    <CommentButtons commentId={commentId}/>
                </HStack>
                {replyFormIsVisible &&
                    <HStack>
                        <IconButton
                            size="xs"
                            variant="ghost"
                            icon={<CloseIcon />}
                            onClick={() => setReplyFormIsVisible(!replyFormIsVisible)}
                        />
                        <ReplyForm authorComment={comment} />
                    </HStack>
                }
                <Replies parentId={commentId} />
            </VStack>
            :
            <VStack p={0.5} w="100%" align="left">
                <Text>
                    <Text
                        as="span"
                        fontWeight="semibold"
                    >{name}</Text>{' '}
                    {comment.body}
                </Text>
                <HStack>
                    <Text fontSize="sm">{createdAtFormat}</Text>
                    <Button
                        size="sm"
                        variant="unstyled"
                        color="gray.600"
                        onClick={() => setReplyFormIsVisible(true)}
                    >Reply</Button>
                </HStack>
                {replyFormIsVisible &&
                    <HStack>
                        <IconButton
                            size="xs"
                            variant="ghost"
                            icon={<CloseIcon />}
                            onClick={() => setReplyFormIsVisible(!replyFormIsVisible)}
                        />
                        <ReplyForm comment={comment}/>
                    </HStack>
                }
                <Replies parentId={commentId} />
            </VStack>
    )
}

export default Comment;

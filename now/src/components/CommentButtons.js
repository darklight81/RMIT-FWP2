import {Button} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
import {deleteComment} from "../data/repository";


function CommentButtons(commentId) {
    return (
        <Button
            size="sm"
            variant="unstyled"
            color="gray.600"
            onClick={ () => deleteComment(commentId.commentId)}>
            <DeleteIcon/>
        </Button>
    )
}

export default CommentButtons;

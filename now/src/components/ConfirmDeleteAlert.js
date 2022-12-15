import { DeleteIcon } from "@chakra-ui/icons";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import {deleteUser, removeUser} from "../data/repository";

function ConfirmDeleteAlert() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleDelete = () => {
    const userId = user.userId;
    onClose();
    logout();
    deleteUser(userId).then(navigate("/"));
  }

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        colorScheme="red"
        leftIcon={<DeleteIcon />}
        onClick={onOpen}
      >Delete</Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete your profile
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default ConfirmDeleteAlert;

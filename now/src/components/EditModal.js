import { useRef, useState } from 'react';
import { useUser } from '../contexts/userContext';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure, VStack } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import {editUser} from  '../data/repository'
function EditModal() {
  const { user, setUser } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const initialFirstName = user.firstname;
  const initialLastName = user.lastname;
  const initialBio = user.bio;
  const [firstname, setFirstname] = useState(user.firstName);
  const [lastname, setLastname] = useState(user.lastName);
  const [bio, setBio] = useState(user.bio);
  const [file, setFile] = useState(user.src);

  async function handleEdit(event) {
    event.preventDefault()
    const updatedUser = {
      ...user,
      firstname: firstname,
      lastname: lastname,
      bio: bio,
      src: file
    }
    setUser(updatedUser)
    await setUserLocal(updatedUser)
    await editUser(updatedUser)

    onClose()
  }

  function handleFile(event) {
    setFile(URL.createObjectURL(event.target.files[0]))
  }

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        leftIcon={<EditIcon />}
        onClick={onOpen}
      >Edit</Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent as="form">
          <ModalHeader>Edit your profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  ref={initialRef}
                  name="firstName"
                  type="text"
                  value={firstname}
                  onChange={e => {setFirstname(e.target.value)}}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last name</FormLabel>
                <Input
                  name="lastName"
                  type="text"
                  value={lastname}
                  onChange={e => { setLastname(e.target.value) }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>About</FormLabel>
                <Textarea
                  name="about"
                  value={bio}
                  onChange={e => { setBio(e.target.value)}}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Profile picture</FormLabel>
                <Input
                  p={0}
                  borderRadius={0}
                  border="none"
                  name="src"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFile}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              onClick={handleEdit}
              mr={2}
              size="sm"
              colorScheme="messenger"
            >Save</Button>
            <Button size="sm" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

async function setUserLocal(user) {
  localStorage.setItem('user', JSON.stringify(user));
}
export default EditModal;

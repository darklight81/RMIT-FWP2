import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchUserByUsername } from "../data/repository";

import Page from "./Page";
import Profile from "./Profile";
import { CircularProgress } from "@chakra-ui/react";

function ProfilePage() {
  const params = useParams()
  const username = params.username

  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getUser() {
      const snapshot = await fetchUserByUsername(username)
      setUser(snapshot)
      setIsLoading(false)
    }
    
    getUser()
  }, [])

  return (
    <Page py={8}>
      {isLoading ? <CircularProgress isIndeterminate /> : (
        <Profile user={user} />
      )}
    </Page>
  )
}

export default ProfilePage;

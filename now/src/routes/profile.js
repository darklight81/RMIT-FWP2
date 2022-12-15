import { useUser } from "../contexts/userContext";

import Page from "../components/Page";
import Profile from "../components/Profile";

function UserProfile() {
  const { user } = useUser()

  return (
    <Page py={8}>
      <Profile user={user} />
    </Page>
  )
}

export default UserProfile;

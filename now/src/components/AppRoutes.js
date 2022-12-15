import { Routes, Route } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

import PageLayout from './PageLayout';
import Landing from '../routes/landing';
import SignUp from '../routes/signup';
import Login from '../routes/login';
import PostProvider from '../contexts/postContext';
import Forum from './Forum';
import ProfilePage from './ProfilePage';
import NoMatch from '../routes/nomatch';
import UserProfile from '../routes/profile';

function AppRoutes() {
  const { isLoggedIn } = useUser();

  return (
    isLoggedIn
      ? <LoggedInRoutes />
      : <LoggedOutRoutes />
  )
}

function LoggedInRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<PostProvider><Forum /></PostProvider>} />
        <Route path=":username" element={<ProfilePage />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}

function LoggedOutRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Landing />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes;
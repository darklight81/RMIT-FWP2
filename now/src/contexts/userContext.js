import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext
} from 'react';

import {
  getUser as getLocalStorageUser,
  setUser as setLocalStorageUser
} from '../data/repository';

export const userContext = createContext(null);
const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = () => {
    setUser(getLocalStorageUser())
    setIsLoggedIn(true)
  }

  const logout = useCallback(() => {
    setUser(null)
    setLocalStorageUser(null)
    setIsLoggedIn(false)
  }, [])

  // Persist logged in user between sessions
  useEffect(() => {
    const fetchUser = () => {
      const user = getLocalStorageUser();

      if (user !== null) {
        login()
      }
    }

    fetchUser();
  }, []);

  const { username, firstname, lastname } = user
  const name = (firstname || lastname)
    ? firstname + " " + lastname
    : username

  return (
    <userContext.Provider
      value={{
          user,
          name,
          setUser,
          isLoggedIn,
          login,
          logout
      }}
    >
      {children}
    </userContext.Provider>
  )
}

/**
 * Allows consumers to subscribe to userContext states and functions
 * available in the UserProvider.
 *
 * @state `user` - The current logged in user.
 * @state `isLoggedIn` - Boolean
 * @function `login()` - Set the active `user` to the local, set `isLoggedIn` to `true`, and set the given user value to local storage.
 * @function `logout()` - Sets the active `user` to null, sets `isLoggedIn` to `false`, and sets the local storage user value to null.
 */
const useUser = () => {
  const context = useContext(userContext);

  if (context === undefined) {
    throw new Error("useUser was used outside of its Provider.");
  }

  return context;
}

export default UserProvider;
export { useUser }

/*
 * Parts of this code are adapted from weekly and online material.
 *  - Week 6 Activity 2
 *  - https://dev.to/pierreouannes/how-to-use-react-context-like-a-pro-11e2
 */

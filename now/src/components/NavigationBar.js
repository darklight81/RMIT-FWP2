import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

import { HStack, Spacer, Button, Avatar } from '@chakra-ui/react';
import { ArrowForwardIcon, EditIcon } from '@chakra-ui/icons';

function NavigationBar() {
  const { isLoggedIn } = useUser();

  return (
    <nav>
      <HStack p={6} spacing={8} justify="space-between">
        {isLoggedIn
          ? <LoggedInNav />
          : <LoggedOutNav />
        }
      </HStack>
    </nav>
  )
}

function LoggedInNav() {
  const navigate = useNavigate();
  const { user, name, logout } = useUser();

  return (
    <>
      <Link to="/"><b>Now</b></Link>

      <HStack>
        <Button
          size="sm"
          leftIcon={<EditIcon />}
          colorScheme="messenger"
          onClick={() => {
            navigate("/")
          }}
        >Post</Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            navigate("/")
          }}
        >Forum</Button>
      </HStack>

      <Spacer />

      <HStack>
        <Link to="/profile">
          <Avatar
            size="sm"
            name={name}
            src={user.src}
          />
        </Link>
        <Button
          data-testid="logout-btn"
          variant="ghost"
          size="sm"
          rightIcon={<ArrowForwardIcon />}
          onClick={() => {
            logout()
            navigate("/")
          }}
        >Sign out</Button>
      </HStack>
    </>
  )
}

function LoggedOutNav() {
  return (
    <>
      <Link to="/">Loop Agile / <b>Now</b></Link>

      <Spacer />

      <HStack>
        <Link to="/login">
          <Button
              data-testid="login-btn"
            variant="outline"
            size="sm"
          >Log in</Button>
        </Link>
        <Link to="/signup">
          <Button
            size="sm"
            colorScheme="messenger"
            rightIcon={<ArrowForwardIcon />}
          >Sign up</Button>
        </Link>
      </HStack>
    </>
  )
}

export default NavigationBar;

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext'
import { verifyUser } from '../data/repository';

import Page from '../components/Page';
import MyForm from '../components/MyForm';
import { TextInput } from '../components/FormHelper';
import { Text, VStack, Link, useToast } from '@chakra-ui/react';

function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useUser();

  const handleSubmit = async (values) => {
    const verified = await verifyUser(values.username, values.password);
    
    if (verified) {
      toast({
        description: "Great! Taking you to your profile.",
        status: "success",
        variant: "subtle",
        duration: 2600,
        containerStyle: {
          marginBottom: "3rem",
          boxShadow: "md",
        }
      });

      setTimeout(() => {
        login();
        navigate("/profile");
      }, 1200);
    }
  }

  const initialValues = {
    username: '',
    password: ''
  }

  return (
    <Page align="center" justify="center" spacing={10}>
      <VStack px={3} maxW="sm" w="100%" spacing={10} align="stretch">
        <MyForm
          heading="Log in"
          subheading="Your posts are waiting."
          navHelperText="No account?"
          navHelperLink="/signup"
          navHelperLinkText="Sign up"
          submitText="Log in"
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          <TextInput
            label="Username"
            name="username"
            type="text"
            placeholder="Your username..."
            autoComplete="username"
          />

          <TextInput
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
          />
        </MyForm>

        <Text align="center">
          Don't know how you got here?<br />
          <Link as={RouterLink} to="/" color="blue.500">Visit our homepage!</Link>
        </Text>
      </VStack>
    </Page>
  )
}

function validate(values) {
  const errors = {};
  const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email);

  if (!values.username) {
    errors.email = "This is required. We need an email to log you in.";
  }

  if (!values.password) {
    errors.password = "Your password is required.";
  }

  return errors;
}

export default Login;

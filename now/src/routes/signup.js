import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import { addUser } from '../data/repository';

import Page from '../components/Page';
import MyForm from '../components/MyForm';
import { TextInput } from '../components/FormHelper';
import { HStack, Link, Spacer, Text, useToast, VStack } from '@chakra-ui/react';

function SignUp() {
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useUser();

  const handleSubmit = async (values) => {
    const isCreated = await addUser(values);

    if (isCreated) {
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
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  }

  return (
    <Page align="center" justify="center" spacing={10}>
      <VStack px={3} maxW="sm" w="100%" spacing={10} align="stretch">
        <MyForm
          heading="Sign up"
          subheading="Sign up for an account to start connecting with your work team."
          navHelperText="Have an account?"
          navHelperLink="/login"
          navHelperLinkText="Log in"
          submitText="Sign up"
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          <HStack>
            <TextInput
              label="First name"
              name="firstName"
              type="text"
              isRequired={true}
            />

            <Spacer />

            <TextInput
              label="Last name"
              name="lastName"
              type="text"
              isRequired={true}
            />
          </HStack>

          <TextInput
            label="Username"
            name="username"
            type="text"
            placeholder="Your desired username..."
            autoComplete="username"
            isRequired={true}
          />

          <TextInput
            label="Password"
            name="password"
            type="password"
            helperText="Your password must be at least twelve letters or eight with letters, numbers, or special characters. Other than that, go wild."
            autoComplete="new-password"
            isRequired={true}
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

  /**
   * Regex matches a minimum of twelve letters, or eight characters
   * with at least one letter and number or special character.
   *
   * Password has letters
   * (?=.*[a-zA-Z])
   *
   * Password has a number or special character
   * (?=.*[\d !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])
   *  - \d is digit
   *  - some characters are escaped
   *
   * Allowed characters
   * [a-zA-Z\d !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]
   *
   * Minimum 8 characters
   * {8,}
   *
   * References for password strength:
   *  - OWASP Password Special Characters https://owasp.org/www-community/password-special-characters
   *  - NIST Password Best Practices https://auth0.com/blog/dont-pass-on-the-new-nist-password-guidelines/
   */
  const isValidPassword = /^[a-zA-Z]{12,}$|^(?=.*[a-zA-Z])(?=.*[\d !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[a-zA-Z\d !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,}$/i.test(values.password);

  if (!values.firstName) {
    errors.firstName = "This is required. We need your first name to create your account.";
  }
  if (!values.lastName) {
    errors.lastName = "This is required. We need your last name to create your account.";
  }

  if (!values.username) {
    errors.username = "This field is required. We need your username to create your account.";
  }
  if (!isValidPassword) {
    errors.password = "Use a password at least 12 letters long, or at least 8 characters long with a mix of letters and numbers or special characters.";
  }

  return errors;
}

export default SignUp;

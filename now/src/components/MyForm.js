import { Link as RouterLink } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Button, Heading, HStack, Link, Spacer, Text, VStack } from '@chakra-ui/react';

function MyForm({
  heading,
  subheading,
  navHelperText,
  navHelperLink,
  navHelperLinkText,
  submitText,
  submitLoadingText,
  initialValues,
  validate,
  onSubmit,
  ...props
  }) {

  return (
    <VStack px={3} maxW="sm" w="100%" spacing={10} align="stretch">
      <VStack spacing={6}>
        <Heading size="3xl" align="center">{heading}</Heading>
        <Text align="center">{subheading}</Text>
      </VStack>

      <Formik {...{ initialValues, validate, onSubmit }}>
        {({ setSubmitting, isSubmitting, isValid, dirty }) => (
          <Form>
            <VStack spacing={8} align="stretch">
              <VStack spacing={2.5}>
                {props.children}
              </VStack>
              <HStack>
                <Text>
                  {navHelperText}{' '}
                  <Link
                    as={RouterLink}
                    to={navHelperLink}
                    color="blue.500"
                  >{navHelperLinkText}</Link>.
                  {/** The `as` prop passes React Router's `to` link to the rendered `a` tag. */}
                </Text>
                <Spacer />
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="blue"
                  data-testid="submit-btn"
                >{submitText}</Button>
              </HStack>
            </VStack>
          </Form>
        )}
      </Formik>
    </VStack>
  )
}

export default MyForm;

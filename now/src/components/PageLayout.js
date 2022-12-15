import { ChakraProvider, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

function PageLayout() {
  return (
    <ChakraProvider>
      <VStack minH="100vh" align="stretch" spacing={6}>
        <NavigationBar />

        {/* This outlet will render child routes for the current 
            routing condition in the AppRoutes component.

              Logged in                 Logged out
                -> Forum "/"              -> Landing "/"
                -> Profile "/profile"     -> Sign up "/signup"
                                          -> Log in "/login"
          */}
        <Outlet />
        <Footer />
      </VStack>
    </ChakraProvider>
  )
}

export default PageLayout;

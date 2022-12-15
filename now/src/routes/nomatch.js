import { Heading, Text, VStack } from "@chakra-ui/react";
import Page from "../components/Page";

function NoMatch() {
  return (
    <Page align="center" justify="center">
      <VStack>
        <Heading>There's nothing here!</Heading>
        <Text align="center">Looks like you navigated to a page that doesn't exist.</Text>
      </VStack>
    </Page>
  );
}

export default NoMatch;

import { HStack, Text } from "@chakra-ui/react";

function Footer() {
  return (
    <footer>
      <HStack p={6} justify="center">
        <Text color="gray.500">© Loop Agile</Text>
      </HStack>
    </footer>
  );
}

export default Footer;

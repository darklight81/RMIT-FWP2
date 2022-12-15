import { VStack, Flex } from "@chakra-ui/react";

function Page(props) {
  return (
    <Flex grow={1}>
      <VStack w="100%" {...props}>
        {props.children}
      </VStack>
    </Flex>
  )
}

export default Page;

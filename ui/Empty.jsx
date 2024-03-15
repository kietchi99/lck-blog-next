import { Box, Center, Heading } from "@chakra-ui/react";

function Empty() {
  return (
    <Box h="100vh">
      <Center>
        <Heading>There are no posts yet</Heading>
      </Center>
    </Box>
  );
}

export default Empty;

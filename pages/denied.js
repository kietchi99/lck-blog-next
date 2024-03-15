// Chakra UI
import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";

//Next
import { useRouter } from "next/navigation";

function Denied() {
  const router = useRouter();

  return (
    <Box p={10}>
      <Center mb={5}>
        <Heading>Access denied</Heading>
      </Center>

      <Center>
        <Text>
          You are logged in, but you do not have the required access level to
          view this page
        </Text>
      </Center>
      <Center my={10}>
        <Button onClick={() => router.push("/")} mx={3}>
          Go to home page
        </Button>
      </Center>
    </Box>
  );
}

export default Denied;

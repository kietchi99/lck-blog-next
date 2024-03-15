// Chakra UI
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";

// NextAuth
import { signIn } from "next-auth/react";

// React
import { useState } from "react";

// React icons
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc";

import { useSession } from "next-auth/react";

// Providers
const PROVIDERS = [
  {
    id: "google",
    name: "Google",
    color: "red",
  },
  {
    id: "github",
    name: "GitHub",
    color: "gray",
  },
];

function Login() {
  const [loading, setLoading] = useState(false);

  const onListItemClick = (providerId) => () => {
    setLoading(true);
    signIn(providerId);
  };

  // Render icons
  const renderIcon = (id) => {
    switch (id) {
      case "google":
        return <Icon as={FaGoogle} />;
      case "github":
        return <Icon as={FaGithub} />;
      default:
        return <Icon as={VscAccount} />;
    }
  };

  return (
    <Box p={5}>
      <Center>
        <Heading as="h1" fontSize={50}>
          Kietcii
        </Heading>
      </Center>
      <Center>
        <Heading as="h7" fontSize={25}>
          Join the Kietcii Community
        </Heading>
      </Center>
      <Center>
        <Text>
          DEV Community is a community of 1,168,430 amazing developers
        </Text>
      </Center>
      <Center mt={3}>{loading ? "Loading..." : null}</Center>
      <Flex direction="column" p={3}>
        {PROVIDERS.map((provider) => {
          return (
            <Center key={provider.id}>
              <Button
                variant="ghost"
                colorScheme={provider.color}
                onClick={onListItemClick(provider.id)}
                leftIcon={renderIcon(provider.id)}
                my={3}
              >
                Continue with {provider.name}
              </Button>
            </Center>
          );
        })}
      </Flex>
    </Box>
  );
}

export default Login;

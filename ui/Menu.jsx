// Chakra UI
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Link,
  List,
  ListItem,
  Spacer,
} from "@chakra-ui/react";

// nextjs
import { useRouter } from "next/router";

//Nextjs
import NextLink from "next/link";

//React Icons
import {
  MdAlternateEmail,
  MdOutlineHome,
  MdOutlinePerson,
} from "react-icons/md";

// pages list
const pages = [
  {
    title: "Home",
    icon: MdOutlineHome,
    href: "/",
  },
  {
    title: "About me",
    icon: MdOutlinePerson,
    href: "/me",
  },
  {
    title: "Contact",
    icon: MdAlternateEmail,
    href: "/contact",
  },
];

// tags list
const tags = [
  {
    label: "#Nextjs",
    href: "/nextjs",
  },
  {
    label: "#Rectjs",
    href: "/reactjs",
  },
  {
    label: "#Javascript",
    href: "/javascript",
  },
];

function Menu() {
  const router = useRouter();

  // render pages
  const renderPages = pages.map((page) => (
    <ListItem key={page.title}>
      <Button
        isActive={router.pathname === page.href}
        variant="ghost"
        leftIcon={<Icon fontSize={20} as={page.icon} />}
        w="100%"
        color="gray"
        fontWeight={1}
        onClick={(index) => {
          router.push(page.href);
        }}
      >
        {page.title}
        <Spacer />
      </Button>
    </ListItem>
  ));

  //render tags
  const renderTags = tags.map((tag) => (
    <Link key={tag.label} m={2} as={NextLink} href={tag.href}>
      {tag.label}
    </Link>
  ));
  return (
    <>
      <Flex>
        <List w="100%" p={2}>
          {renderPages}
        </List>
      </Flex>
      <Box pl={6}>
        <Heading as="h5" size="sm" color="blue.400">
          Popular tags
        </Heading>
        <Flex direction="column" color="gray">
          {renderTags}
        </Flex>
      </Box>
      <Box pl={6}>
        <Heading as="h5" size="sm" color="blue.400">
          Other
        </Heading>
      </Box>
      <Center mt={10} fontSize={14}>
        @ChiKietlam 2023.
      </Center>
    </>
  );
}

export default Menu;

// Chakra UI
import {
  chakra,
  Box,
  Flex,
  Spacer,
  Button,
  ButtonGroup,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  Icon,
  MenuGroup,
  useDisclosure as useDrawer,
} from "@chakra-ui/react";

// Chakra UI Icons
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

// React Icons
import { HiHome, HiMiniPencilSquare, HiOutlineHome } from "react-icons/hi2";
import { MdFavoriteBorder, MdOutlineLogout } from "react-icons/md";

// Next Auth
import { useSession, signOut } from "next-auth/react";

// Nextjs
import { useRouter, usePathname } from "next/navigation";

// React
import { useState } from "react";

// Hooks
import { useGetUser } from "@/hooks/users";

// Components
import Drawer from "./Drawer";
import Modal from "./Modal";

//contexts
import { useDarkMode } from "../context/themeContext";

export default function Header() {
  const { PrimaryBg } = useDarkMode();
  const [isLoginning, setIsLoginning] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();

  const router = useRouter();
  const pathname = usePathname();

  const { data: session } = useSession();
  const { data: dbUser } = useGetUser({
    email: session?.user?.email,
  });

  return (
    <Flex
      py="2"
      pl="4"
      pr="8"
      minWidth="100vw"
      alignItems="center"
      gap="2"
      zIndex="banner"
      position="fixed"
      bg={PrimaryBg}
      boxShadow="lg"
    >
      <Drawer />
      <Box>
        <Button
          onClick={() => router.push("/")}
          variant="ghost"
          fontSize={{ base: "18px", md: "30px" }}
        >
          KietCii
        </Button>
      </Box>
      <Spacer />
      <Box display={{ base: "none", md: "flex" }}>
        <Modal />
      </Box>
      <Spacer />
      {session?.user?.role !== "admin" ? null : pathname ===
        "/admin/articles/create" ? null : (
        <>
          <Button
            display={{ base: "none", md: "block" }}
            isLoading={isCreating}
            onClick={() => {
              setIsCreating(true);
              router.push("/admin/articles/create");
              setIsCreating(false);
            }}
            leftIcon={<Icon as={HiMiniPencilSquare} />}
          >
            Create article
          </Button>
          <Button
            display={{ base: "block", md: "none" }}
            isLoading={isCreating}
            onClick={() => {
              setIsCreating(true);
              router.push("/admin/articles/create");
              setIsCreating(false);
            }}
          >
            <Icon as={HiMiniPencilSquare} />
          </Button>
        </>
      )}
      <ButtonGroup gap={{ base: 0, md: 1 }}>
        <Box display={{ base: "block", md: "none" }}>
          <Modal />
        </Box>

        <chakra.button
          px="3"
          color="gray"
          py="2"
          rounded="md"
          _hover={{ bg: "gray.200" }}
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </chakra.button>
      </ButtonGroup>
      {session?.user ? (
        <Menu>
          <MenuButton>
            <Avatar
              size="sm"
              name={session?.user?.name}
              src={session?.user?.avatar}
            />
          </MenuButton>
          <MenuList>
            <MenuGroup title={session?.user?.name}>
              <MenuItem
                as={Button}
                icon={<Icon fontSize={24} as={MdFavoriteBorder} />}
                onClick={() => router.push("/me")}
              >
                {`(${dbUser?.savedArticles?.length || 0}) Favorite article`}
              </MenuItem>
              <MenuItem
                as={Button}
                icon={<Icon fontSize={24} as={MdOutlineLogout} />}
                onClick={() => {
                  signOut();
                }}
              >
                Log out
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      ) : (
        <Button
          isLoading={isLoginning}
          colorScheme="messenger"
          onClick={() => {
            setIsLoginning(true);
            router.push("/login");
          }}
          size="sm"
        >
          Log in
        </Button>
      )}
    </Flex>
  );
}

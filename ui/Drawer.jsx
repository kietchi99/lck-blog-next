// React
import { useRef } from "react";

// Nextjs
import { useRouter } from "next/navigation";

// Chakra UI icons
import { HamburgerIcon } from "@chakra-ui/icons";

// Charkra UI
import {
  Button,
  chakra,
  Drawer as DrawerUI,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";

// Components
import SideBar from "./SideBar";
import Menu from "./menu";

export default function Drawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();

  const router = useRouter();

  return (
    <>
      <chakra.button
        colorScheme="teal"
        ref={btnRef}
        px="3"
        color="gray"
        py="2"
        mb={1}
        rounded="md"
        _hover={{ bg: "gray.200" }}
        display={{ md: "none" }}
        onClick={onOpen}
      >
        <HamburgerIcon />
      </chakra.button>
      <DrawerUI
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Button onClick={() => router.push("/")} variant="ghost" size="md">
              KietCii
            </Button>
          </DrawerHeader>

          <DrawerBody>
            <Menu />
            <SideBar />
          </DrawerBody>
        </DrawerContent>
      </DrawerUI>
    </>
  );
}

// Chakra Ui
import { Flex } from "@chakra-ui/react";

// Components
import Menu from "./menu";

//contexts
import { useDarkMode } from "../context/themeContext";

function SideBar() {
  const { PrimaryBg } = useDarkMode();
  return (
    <Flex
      w="210px"
      flexDirection="column"
      display={{ base: "none", md: "flex" }}
      minHeight="100vh"
      bg={PrimaryBg}
    >
      <Menu />
    </Flex>
  );
}

export default SideBar;

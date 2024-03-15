// Chakra Ui
import { Box, Flex } from "@chakra-ui/react";

//contexts
import { useDarkMode } from "../context/themeContext";

// components
import Header from "./Header";
import SideBar from "./SideBar";

function Applayout({ children }) {
  const { SecondaryBg } = useDarkMode();
  return (
    <Box>
      <Header />
      <Flex paddingTop="55px" bg={SecondaryBg}>
        <SideBar />
        {children}
      </Flex>
    </Box>
  );
}

export default Applayout;

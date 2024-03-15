// theme.js

// 1. import `extendTheme` function
import { extendTheme, useColorModeValue } from "@chakra-ui/react";

// 2. Add your color mode config
// Here's the signature

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
  colors: {
    primary: {
      light: "#0a369d",
      dark: "#192bc2",
    },
    secondary: {
      light: "gray.400",
      dark: "gray.200",
    },
  },
};

// 3. extend the theme
const theme = extendTheme({ config });

export default theme;

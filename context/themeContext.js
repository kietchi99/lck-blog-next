//Chakra IU
import { useColorModeValue } from "@chakra-ui/react";

//React
const { createContext, useContext } = require("react");

const DarkModeContext = createContext();

//Provider
function DarkModeProvider({ children }) {
  const PrimaryBg = useColorModeValue("white", "#2d3142");
  const SecondaryBg = useColorModeValue("gray.50", "#4f5d75");
  return (
    <DarkModeContext.Provider value={{ PrimaryBg, SecondaryBg }}>
      {children}
    </DarkModeContext.Provider>
  );
}

//use provider
function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };

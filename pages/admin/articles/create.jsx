//Components
import Toast from "@/ui/Toast";
import CreateArticle from "@/ui/CreateArticle";
import { Center } from "@chakra-ui/react";

//contexts
import { useDarkMode } from "../../../context/themeContext";

function Create() {
  const { SecondaryBg } = useDarkMode();
  return (
    <Center bg={SecondaryBg} flex={1}>
      <Toast />
      <CreateArticle />
    </Center>
  );
}

export default Create;

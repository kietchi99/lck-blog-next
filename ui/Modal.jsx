// Algolia search
import { algoliaSearchClient } from "../lib/algolia/index";
import { InstantSearch, Index } from "react-instantsearch-dom";

// Chakra UI
import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Modal as ModalUI,
  Text,
  Heading,
  Box,
  chakra,
  useDisclosure,
} from "@chakra-ui/react";

// Chakra UI icons
import { SearchIcon } from "@chakra-ui/icons";

// Compnents
import SearchBox from "./Searchbox";
import Hit from "./Hit";

export default function Modal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        pr="200px"
        color="gray"
        size="sm"
        leftIcon={<SearchIcon />}
        variant="solid"
        onClick={onOpen}
        display={{ base: "none", md: "block" }}
      >
        Search...
      </Button>
      <chakra.button
        px="3"
        py="2"
        rounded="md"
        onClick={onOpen}
        display={{ md: "none" }}
        _hover={{ bg: "gray.200" }}
        color="gray"
      >
        <SearchIcon />
      </chakra.button>
      <ModalUI onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent pr={3} pl={3}>
          <InstantSearch
            indexName="articles"
            searchClient={algoliaSearchClient}
          >
            <ModalHeader>
              <Heading color="blue.500" size="md" as="h7">
                Search
              </Heading>
            </ModalHeader>
            <ModalCloseButton />
            <SearchBox />
            <ModalBody mt={2} pb={5}>
              <Index indexName="articles">
                <Hit onClose={onClose} />
              </Index>
            </ModalBody>
          </InstantSearch>
        </ModalContent>
      </ModalUI>
    </>
  );
}

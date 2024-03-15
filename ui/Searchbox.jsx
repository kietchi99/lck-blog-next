// Chakra Ui icons
const { SearchIcon } = require("@chakra-ui/icons");

// Chakra UI
import { InputGroup, InputLeftElement, Input, Spinner } from "@chakra-ui/react";

// Algolia search
import { connectSearchBox } from "react-instantsearch-dom";

const Searchbox = (renderOptions) => {
  const { currentRefinement, isSearchStalled, refine } = renderOptions;
  const onInputChange = (event) => {
    refine(event.currentTarget.value);
  };

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        {isSearchStalled ? (
          <Spinner color="blue.500" size="xs" />
        ) : (
          <SearchIcon color="blue.500" />
        )}
      </InputLeftElement>
      <Input value={currentRefinement} onChange={onInputChange} />
    </InputGroup>
  );
};

const CustomSearchBox = connectSearchBox(Searchbox);

export default CustomSearchBox;

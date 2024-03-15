//chakra UI
import { Box } from "@chakra-ui/react";

//React
import { useState } from "react";

//component
import SortBy from "./sortBy";
import Pagination from "./Pagination";

function MainLayout() {
  const [isSorted, setIsSorted] = useState("new");

  function handleOnclick(ev) {
    setIsSorted(ev.target.id);
  }

  return (
    <Box flex={1}>
      <SortBy isSorted={isSorted} onSorted={handleOnclick} />
      <Box px={5}>
        <Pagination sortBy={isSorted} />
      </Box>
    </Box>
  );
}

export default MainLayout;

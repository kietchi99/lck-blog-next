// Chakra Ui
import { Box, Text } from "@chakra-ui/react";

//Next
import Link from "next/link";

// React
import { useMemo } from "react";

// instantsearch - algolia search
import { connectHits } from "react-instantsearch-dom";

const Hit = ({ hits, onClose }) => {
  const renderedHitItems = useMemo(() => {
    return (
      <Box mt={1}>
        {hits.map((hit) => (
          <Box
            p={2}
            _hover={{
              background: "gray.100",
              color: "gray.600",
            }}
            color="gray"
            key={hit.title}
            mt={1}
            sx={{ cursor: "pointer" }}
          >
            <Link onClick={() => onClose()} href={`/articles/${hit.slug}`}>
              {hit.title}
            </Link>
          </Box>
        ))}
      </Box>
    );
  }, [hits, onClose]);

  return <>{renderedHitItems}</>;
};

const CustomHits = connectHits(Hit);

export default CustomHits;

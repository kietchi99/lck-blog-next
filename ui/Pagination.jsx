// Chakra Ui
import { Box, Button, Center } from "@chakra-ui/react";

// React
import { Fragment } from "react";

// Compoments
import Loading from "./Loading";
import Error from "./Error";
import ItemList from "./ItemList";
import CommentList from "./CommentList";
import Empty from "./Empty";

// Hooks
import { usePagination } from "@/hooks/pagination";

function Projects({ sortBy, articlesID, userID }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePagination({ sortBy, articlesID, userID });
  if (status === "loading") return <Loading />;
  if (status === "error") return <Error />;
  if (!data.pages[0] && status !== "loading") return <Empty />;

  return (
    <Box>
      {data?.pages?.map((page, i) => (
        <Fragment key={i}>
          {!articlesID ? (
            <ItemList articles={page} />
          ) : (
            <CommentList articleID={articlesID} comments={page} />
          )}
        </Fragment>
      ))}
      {!hasNextPage ? null : (
        <Center m={4}>
          <Button
            colorScheme="messenger"
            onClick={() => fetchNextPage()}
            isDisabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading..."
              : hasNextPage
              ? "Read more"
              : null}
          </Button>
        </Center>
      )}
    </Box>
  );
}

export default Projects;

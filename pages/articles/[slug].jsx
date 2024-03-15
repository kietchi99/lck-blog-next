// React
import { useState } from "react";

// ChakraUI
import { Box, Button, Flex, Heading, Icon } from "@chakra-ui/react";

// React icons
import { BiLike } from "react-icons/bi";

//nextAuth
import { useSession } from "next-auth/react";

//Nextjs
import { useRouter } from "next/navigation";

//api
import { getAllArticles, getArticle } from "../api/articles";

//components
import Pagination from "@/ui/Pagination";
import CreateComment from "@/ui/CreateComment";
import DetailContent from "@/ui/DetailContent";
import { useAllComments } from "@/hooks/comments";

function DetailPage({ article }) {
  const router = useRouter();

  const [isLoginning, setIsLoginning] = useState(false);

  const { data: session } = useSession();
  const { data: commentDatas } = useAllComments({ articleID: article._id });
  const TotalComments = commentDatas?.comments?.length;

  return (
    <>
      <Flex width="100%" flexDirection={{ base: "column", lg: "row" }}>
        <Box width={{ base: "100%", lg: "75%" }}>
          <DetailContent article={article} />
          <Box p={10} bg="white">
            <Box>
              <Heading as="h4" size="md">
                Comments({TotalComments})
              </Heading>
            </Box>
            {session ? (
              <CreateComment article={article} />
            ) : (
              <Box px={10}>
                <Button
                  colorScheme="messenger"
                  w="100%"
                  m={3}
                  isLoading={isLoginning}
                  onClick={() => {
                    setIsLoginning(true);
                    router.push("/login");
                  }}
                >
                  Login to comment
                </Button>
              </Box>
            )}
            <Pagination articlesID={article._id} />
          </Box>
        </Box>
        <Flex py={14}>
          <Heading size="md">You can like</Heading>
          <Icon ml={1} fontSize="24px" as={BiLike} />
        </Flex>
      </Flex>
    </>
  );
}

export async function getStaticProps({ params }) {
  const article = await getArticle(params.slug);
  return {
    props: { article },
  };
}

export async function getStaticPaths() {
  const articles = await getAllArticles();
  const paths = articles.map((a) => {
    return {
      params: { slug: a.slug },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export default DetailPage;

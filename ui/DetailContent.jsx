import { useHeart } from "../hooks/articles";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
//Nextjs
import { useRouter } from "next/navigation";

//nextAuth
import { useSession } from "next-auth/react";

// Chakra UI
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

// Components
import Dialog from "./Dialog";
import EditorOutput from "./EditorOutput";

// Utils
import { timeAgo } from "@/utils";

function DetailContent({ article }) {
  return (
    <>
      <Box p={10}>
        <Box>
          <Heading>{article.title}</Heading>
        </Box>
        <Box my={10}>
          <Flex>
            <Box mr={2}>
              <Avatar size="md" name="Kent Dodds" src={article.author.avatar} />
            </Box>
            <Box>
              <Box>
                <Text fontWeight={600}>{article.author.name}</Text>
              </Box>
              <Box>
                <Text>Posted {timeAgo(article.createdAt)}</Text>
              </Box>
            </Box>
          </Flex>
          <Box my={7}>
            <EditorOutput content={article.content} />
          </Box>
          <Box>
            {article.tags.map((tag) => (
              <Button mx={5} colorScheme="gray" variant="link" key={tag}>
                #{tag}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DetailContent;

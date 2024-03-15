//Chakra UI
import {
  Card,
  Box,
  Flex,
  Avatar,
  Heading,
  Center,
  Text,
  ButtonGroup,
  Button,
  Icon,
  Link,
  useDisclosure,
  Image,
  Spacer,
} from "@chakra-ui/react";

//Next
import NextLink from "next/link";
import { useRouter } from "next/navigation";

//Next auth
import { useSession } from "next-auth/react";

//React
import { useMemo, useState } from "react";

//React icons
import {
  MdBookmark,
  MdFavorite,
  MdFavoriteBorder,
  MdModeEdit,
} from "react-icons/md";

import { timeAgo } from "@/utils";

//Components
import Dialog from "./Dialog";
import { useHeart } from "../hooks/articles";
import { useBookmark, useGetUser } from "../hooks/users";

function Item({ article }) {
  const router = useRouter();

  const { data: session } = useSession();
  const { data: dbUser } = useGetUser({
    email: session?.user?.email,
  });

  const [isEditing, setIsEditing] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isHearting, heart } = useHeart();
  const { isBookmarking, bookmark } = useBookmark();

  // Liked users
  const liked = article.likedUsers.find(
    (user) => user._id === session?.user?._id
  );

  // Saved articles
  const saved = dbUser?.savedArticles.find((item) => item?._id === article._id);
  console.log("saved: ", saved);

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        header="Login"
        body="Login to heart"
        href="/login"
      />
      <Card my={4} p={3} w={{ base: "100%", xl: "80%" }}>
        <Flex px={2} py={1}>
          <Flex>
            <Center mr={2}>
              <Avatar
                name={article?.author[0]?.name}
                src={article?.author[0]?.avatar}
                size="xs"
              />
            </Center>
            <Center mr={2}>
              <Heading size="xs">
                {article?.author[0]?.name || "Unknow"}
              </Heading>
            </Center>
            <Center mr={2}>
              <Text fontSize={15}>{timeAgo(article?.createdAt)}</Text>
            </Center>
          </Flex>
          <Spacer />
          {session?.user?.role === "admin" && (
            <Button
              isLoading={isEditing}
              variant="ghost"
              onClick={() => {
                setIsEditing(true);
                router.push(`/admin/articles/${article.slug}/edit`);
              }}
            >
              <Icon as={MdModeEdit} fontSize="20px" />
            </Button>
          )}
        </Flex>
        <Center py={1} px={5}>
          {article?.imageCover ? (
            <Box bg="blue">
              <Image
                maxHeight="300px"
                src={article?.imageCover}
                alt={article?.imageCover}
              />
            </Box>
          ) : null}
        </Center>
        <Box py={2} px={1}>
          <Box my={5}>
            <Heading size="lg">
              <Link
                color="blue.400"
                as={NextLink}
                href={`/articles/${article?.slug}`}
              >
                {article?.title}
              </Link>
            </Heading>
          </Box>
          {article?.tags?.length > 0 ? (
            <ButtonGroup variant="ghost" spacing="6" size="sm">
              {article?.tags?.map((tag) => (
                <Button onClick={() => router.push(tag)} key={tag}>
                  #{tag}
                </Button>
              ))}
            </ButtonGroup>
          ) : null}
        </Box>
        <Flex justifyContent="space-between" px={6} my={3}>
          <Flex>
            <Button
              isLoading={isHearting}
              onClick={
                session?.user
                  ? () =>
                      heart({
                        articleID: article._id,
                        email: session?.user?.email,
                      })
                  : onOpen
              }
              variant="ghost"
              size="sm"
            >
              {liked ? (
                <Icon color="red" fontSize={28} as={MdFavorite} />
              ) : (
                <Icon fontSize={28} as={MdFavoriteBorder} />
              )}
            </Button>
            <Center>
              <Text>{article?.numLikes}</Text>
            </Center>
          </Flex>

          <Button
            onClick={
              session?.user
                ? () =>
                    bookmark({
                      userID: session?.user._id,
                      articleID: article._id,
                    })
                : onOpen
            }
            variant="ghost"
            size="sm"
          >
            <Icon color={saved ? "orange" : ""} fontSize={28} as={MdBookmark} />
          </Button>
        </Flex>
      </Card>
    </>
  );
}

export default Item;

// Chakra UI
import {
  Avatar,
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

// Chakra UI Icons
import { DeleteIcon } from "@chakra-ui/icons";

// React
import { useState } from "react";

// React Icons
import { MdReply } from "react-icons/md";

// Comoonents
import Dialog from "./Dialog";

// Next auth
import { useSession } from "next-auth/react";

// Hooks
import { useCreateComment, useDeleteComment } from "@/hooks/comments";

// Utils
import { timeAgo } from "@/utils";

function Comment({ comment, articleID }) {
  const [isOpenReply, setIsOpenReply] = useState(false);
  const [input, setInput] = useState("");

  const { data: session } = useSession();

  const { isDeleting, deleteComment } = useDeleteComment();
  const { isCreating, createComment } = useCreateComment();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        header="Login"
        body="Login to heart"
        href="/login"
      />
      <Flex mb={5}>
        <Box py={5}>
          <Avatar
            size="sm"
            name={comment?.user?.name || "Someone"}
            src={comment?.user?.avatar}
          />
        </Box>
        <Box
          w="100%"
          p={5}
          mx={2}
          borderRadius="md"
          border="1px"
          borderColor="gray.200"
        >
          <Flex>
            <Box mr={3}>
              <Text fontWeight="600">{comment?.user?.name || "Unknow"}</Text>
            </Box>
            <Box>
              <Text>{timeAgo(comment?.createdAt)}</Text>
            </Box>
            {session?.user?._id === comment?.user?._id && (
              <>
                <Spacer />
                <Box>
                  <Button
                    isLoading={isDeleting}
                    variant="ghost"
                    onClick={() => deleteComment(comment?._id)}
                  >
                    <DeleteIcon />
                  </Button>
                </Box>
              </>
            )}
          </Flex>
          <Box>
            <Text fontWeight={600}>
              {comment?.replyTo ? `Reply @${comment?.replyTo?.name}: ` : ""}
            </Text>
            {comment?.content}
          </Box>
          <Box>
            {!isOpenReply ? (
              <Button
                onClick={
                  session?.user ? () => setIsOpenReply(!isOpenReply) : onOpen
                }
                colorScheme="gray"
                variant="ghost"
                size="sm"
                leftIcon={<MdReply />}
              >
                Reply
              </Button>
            ) : null}
          </Box>
          {isOpenReply && (
            <Box my={3}>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your comment"
                my={2}
              />
              <Button
                mx={1}
                isDisabled={!input}
                isLoading={isCreating}
                onClick={() => {
                  if (!input) return;
                  setInput("");
                  createComment({
                    content: input,
                    article: articleID,
                    user: session?.user?._id,
                    replyTo: comment?.user?._id,
                    parent: comment?.parent ? comment?.parent : comment?._id,
                  });
                }}
              >
                Reply
              </Button>
              <Button onClick={() => setIsOpenReply(!isOpenReply)}>
                Cancer
              </Button>
            </Box>
          )}
        </Box>
      </Flex>
    </>
  );
}

export default Comment;

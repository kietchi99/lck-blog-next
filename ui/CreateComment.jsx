// Chakra Ui
import { Box, Flex, Avatar, Textarea, Button, Text } from "@chakra-ui/react";

// React
import { useState } from "react";

// Nextjs
import { useSession } from "next-auth/react";

// Hooks
import { useCreateComment } from "@/hooks/comments";

function CreateComment({ article }) {
  const [text, setText] = useState("");
  const { data: session } = useSession();

  const { isCreating, createComment } = useCreateComment();

  return (
    <Box py={4}>
      <Flex>
        <Avatar
          size="sm"
          name={session?.user?.name}
          src={session?.user?.avatar}
        />
        <Box px={3}>
          <Text fontWeight="500">{session?.user?.name}</Text>
        </Box>
      </Flex>
      <Box py={3}>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your comment"
        />
      </Box>
      <Flex justifyContent="flex-end">
        <Button
          isDisabled={!text}
          isLoading={isCreating}
          colorScheme="messenger"
          onClick={() => {
            if (!text) return;
            setText("");
            createComment({
              content: text,
              article: article._id,
              user: session?.user?._id,
            });
          }}
        >
          Comment
        </Button>
      </Flex>
    </Box>
  );
}

export default CreateComment;

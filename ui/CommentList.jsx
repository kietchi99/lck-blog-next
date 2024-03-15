// Chakra UI
import { Box } from "@chakra-ui/react";

// Components
import Comment from "./Comment";

// Hooks
import { useAllComments } from "../hooks/comments";

function CommentList({ comments, articleID }) {
  const { data } = useAllComments({ articleID });
  const replyComments = data.replyComments;
  return (
    <Box>
      {comments.map((comment) => {
        const renderReplyComments = replyComments?.map((replyComment) => {
          return replyComment.parent === comment._id ? (
            <Comment
              articleID={articleID}
              key={replyComment._id}
              comment={replyComment}
            />
          ) : null;
        });
        return (
          <>
            <Comment
              articleID={articleID}
              key={comment._id}
              comment={comment}
            />
            <Box pl={10}>{renderReplyComments}</Box>
          </>
        );
      })}
    </Box>
  );
}

export default CommentList;

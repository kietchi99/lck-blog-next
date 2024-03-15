// Chakra Ui
import { Box, Heading } from "@chakra-ui/react";

// Next
import { useSession } from "next-auth/react";

// Components
import Pagination from "@/ui/Pagination";

// Hooks
import { useGetUser } from "@/hooks/users";

function Me() {
  // get session user
  const { data: session } = useSession();
  // get database user
  const { data: dbUser } = useGetUser({ email: session?.user?.email });
  return (
    <Box flex={1}>
      <Box px={5}>
        <Heading size="md" m={5}>{`Your favorite articles (${
          dbUser?.savedArticles?.length || 0
        })`}</Heading>
        <Pagination userID={dbUser?._id} />
      </Box>
    </Box>
  );
}

export default Me;

//Next auth
import { useSession } from "next-auth/react";

// React
import { useRef, useState } from "react";

// Chakra UI
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Heading,
  Center,
  Card,
} from "@chakra-ui/react";

// Hooks
import { useCreateArticle, useUpdateArticle } from "../hooks/articles";

// Compnents
import TagsIput from "./TagsIput";
import Editor from "@/ui/Editor";

function CreateArticle({ defaultValue }) {
  const [isPublic, setIsPublic] = useState(true);
  const [title, setTitle] = useState(defaultValue?.title || "");
  const [tags, setTags] = useState(defaultValue?.tags || []);

  const editorRef = useRef();

  const { data: session } = useSession();

  const { isCreating, createArticle } = useCreateArticle();
  const { isUpdating, updateArticle } = useUpdateArticle();

  async function handleSubmit() {
    const blocks = await editorRef.current?.save();

    const slug = title.replace(/ /g, "-");

    let imageCover = "";
    if (blocks) {
      const haveImage = blocks.blocks.find((block) => block.type === "image");
      if (haveImage) imageCover = haveImage.data.file.url;
    }

    const payload = {
      id: defaultValue?._id || null,
      title,
      slug,
      content: blocks,
      isPublic,
      tags,
      author: session?.user?._id || "6543baf081c7c30e28949164",
      imageCover,
    };

    // update or create article
    if (!defaultValue) {
      createArticle(payload);
    } else {
      updateArticle(payload);
    }
  }
  return (
    <Container>
      <Card my={4} p={5}>
        <FormControl p={2}>
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <TagsIput tags={tags} setTags={setTags} />
        <FormControl p={2} display="flex" alignItems="center">
          <FormLabel htmlFor="email-alerts" mb="0">
            Public
          </FormLabel>
          <Switch
            id="isPublic"
            value={isPublic}
            isChecked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
        </FormControl>
        <Editor ref={editorRef} defaultValue={defaultValue?.content} />
        <Flex justify="flex-end">
          <Button
            isDisabled={!title}
            isLoading={isCreating || isUpdating}
            onClick={handleSubmit}
            m={2}
            colorScheme="messenger"
          >
            {defaultValue ? "Update" : "Create"} and
            {isPublic ? " public" : " Not Public"}
          </Button>
        </Flex>
      </Card>
    </Container>
  );
}

export default CreateArticle;

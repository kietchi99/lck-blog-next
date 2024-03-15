// Chakra UI
import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";

function TagsIput({ tags, setTags }) {
  function addTagHandle(e) {
    if (e.key !== "Enter") return;

    const value = e.target.value;

    setTags([...tags, value]);
    e.target.value = "";
  }

  function removeTagHandle(index) {
    setTags(tags.filter((tag, i) => i !== index));
  }

  return (
    <Box>
      <FormControl p={2}>
        <FormLabel>Tag</FormLabel>
        <Input type="text" onKeyDown={addTagHandle} />
      </FormControl>
      <Box p={2}>
        {tags.map((tag, index) => (
          <Tag
            m={1}
            key={tag}
            borderRadius="full"
            variant="solid"
            colorScheme="messenger"
          >
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={() => removeTagHandle(index)} />
          </Tag>
        ))}
      </Box>
    </Box>
  );
}

export default TagsIput;

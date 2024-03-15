// Chakra ui
import { Button, ButtonGroup, Flex } from "@chakra-ui/react";

const buttonList = [
  {
    label: "New",
    value: "new",
  },
  {
    label: "Top",
    value: "top",
  },
];

function sortBy({ isSorted, onSorted }) {
  const renderButtons = buttonList.map((btn) => (
    <Button
      key={btn.value}
      id={btn.value}
      colorScheme={isSorted === btn.value ? "messenger" : null}
      onClick={onSorted}
    >
      {btn.label}
    </Button>
  ));

  return (
    <Flex py={3} px={6}>
      <ButtonGroup spacing="6">{renderButtons}</ButtonGroup>
    </Flex>
  );
}

export default sortBy;

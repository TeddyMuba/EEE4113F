import { Flex, Text } from "@chakra-ui/react";
import React from "react";
type ListPairProps = {
  label?: string;
  value?: string | number;
};
const ListPair: React.FC<ListPairProps> = ({ label, value }) => (
  <Flex w="100%" justify="space-between">
    <Text fontSize="sm" mr={4}>
      {label}
    </Text>
    <Text color="gray.600" fontSize="sm" isTruncated fontWeight="bold">
      {value}
    </Text>
  </Flex>
);

export default ListPair;

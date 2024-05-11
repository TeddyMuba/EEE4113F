import { Flex, Heading } from "@chakra-ui/react";
import * as React from "react";

const PageNotFound: React.FC = () => {
  return (
    <Flex justify="center" align="center" p={4} flexDir="column">
      <Heading as="h4">
        Sorry, we couldn&apos;t find what you were looking for.
      </Heading>
    </Flex>
  );
};

export default PageNotFound;

import { Box, Container } from "@chakra-ui/react";
import React from "react";
import { APP_NAME } from "../../constants";

type NavProps = {};
const Nav: React.FC<NavProps> = () => {
  return (
    <Box py={8} borderBottom="1px solid" borderColor="gray.100">
      <Container maxW="container.lg">{APP_NAME}</Container>
    </Box>
  );
};

export default Nav;

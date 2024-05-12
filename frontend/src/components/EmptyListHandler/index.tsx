import { Image, Heading, Text, VStack, Container } from "@chakra-ui/react";
import * as React from "react";
import images from "../../theme/images";

type EmptyListHandlerProps = {
  title?: string;
  subTitle?: string;
};

const EmptyListHandler: React.FC<EmptyListHandlerProps> = ({
  title,
  subTitle,
}) => {
  return (
    <Container>
      <VStack>
        <Image src={images[404]} alt="404 images" width="80%" />
        <Heading textAlign="center">
          {title ?? "there is nothing here."}
        </Heading>
        <Text textAlign="center">
          {subTitle ?? "Go ahead and create your first record to get started."}
        </Text>
      </VStack>
    </Container>
  );
};

export default EmptyListHandler;

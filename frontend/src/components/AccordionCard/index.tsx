import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  AccordionProps,
} from "@chakra-ui/react";

import React from "react";

type AccordionCardProps = {
  label: React.ReactNode;
} & AccordionProps;

const AccordionCard: React.FC<AccordionCardProps> = ({
  label,
  children,
  ...rest
}) => {
  return (
    <Accordion
      allowToggle
      borderLeft="1px solid"
      borderRight="1px solid"
      borderColor="gray.100"
      {...rest}
    >
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "gray.50" }}>
            {label}
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel p={6}>{children}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionCard;

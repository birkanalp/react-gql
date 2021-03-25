import { Box } from "@chakra-ui/react";
import React from "react";

export type WrapperVariant = "small" | "regular";

type Props = {
  variant?: WrapperVariant;
};

const Wrapper: React.FC<Props> = ({ children, variant }) => {
  return (
    <Box
      mt={8}
      mx={"auto"}
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
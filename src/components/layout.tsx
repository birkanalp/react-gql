import React from "react";
import NavBar from "./navbar";
import Wrapper, { WrapperVariant } from "./wrapper";

interface Props {
  variant?: WrapperVariant;
}
const Layout: React.FC<Props> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;

import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface Props {}
const NavBar: React.FC<Props> = ({}) => {
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;

  const onLogout = () => {
    logout();
  };

  if (fetching) {
  } else if (!data?.me?.id) {
    body = (
      <>
        <NextLink href="login">
          <Link color="white" href="login" mr={4}>
            Login
          </Link>
        </NextLink>
        <NextLink href="register">
          <Link color="white">Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={4}>{data?.me?.username}</Box>
        <Button variant="link" onClick={onLogout} isLoading={logoutFetching}>
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tomato" p={4}>
      <Box mr={"auto"}>
        <NextLink href="./create-post">
          <Link>Create Post</Link>
        </NextLink>
      </Box>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};

export default NavBar;

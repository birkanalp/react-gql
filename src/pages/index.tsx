import React, { useState } from "react";
import NavBar from "../components/navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/urql-client";
import { usePostsQuery } from "../generated/graphql";
import Layout from "../components/layout";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";

const Index = () => {
  const [pagination, setPagination] = useState({ limit: 2, index: 1 });
  const [{ data, fetching }] = usePostsQuery({
    variables: pagination,
  });

  const onClickPrev = () => {
    setPagination({ limit: 2, index: pagination.index - 1 });
  };

  const onClickNext = () => {
    setPagination({ limit: 2, index: pagination.index + 1 });
  };

  return (
    <Layout>
      {!data ? (
        <div>loading</div>
      ) : (
        <Stack spacing={8}>
          {data.posts?.data?.map((p) => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.text}</Text>
            </Box>
          ))}
        </Stack>
      )}
      <Flex justifyContent="space-between">
        <Button
          isLoading={fetching}
          my={4}
          onClick={onClickPrev}
          disabled={!data || !data.posts.page.previous}
        >
          Prev
        </Button>
        <Button
          isLoading={fetching}
          my={4}
          onClick={onClickNext}
          disabled={!data || !data.posts.page.next}
        >
          More
        </Button>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);

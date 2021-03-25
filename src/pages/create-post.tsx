import { Button } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import InputField from "../components/input";
import Layout from "../components/layout";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";
import { createUrqlClient } from "../utils/urql-client";

interface Props {}
interface FormModel {
  title: string;
  text: string;
}

const CreatePost: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();
  useIsAuth();

  const onSubmit = async (
    values: FormModel,
    { setErrors }: FormikHelpers<FormModel>
  ) => {
    const { error } = await createPost({ input: values });
    if (!error) {
      router.push("/");
    }
  };

  return (
    <Layout>
      <Formik
        initialValues={{ title: "", text: "" } as FormModel}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            <InputField label="Title" name="title" />
            <InputField label="Body" name="text" textarea />

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);

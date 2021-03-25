import { Button } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/input";
import Wrapper from "../components/wrapper";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/to-error-map";
import { createUrqlClient } from "../utils/urql-client";

interface Props {}
interface FormModel {
  usernameOrEmail: string;
  password: string;
}

const Login: React.FC<Props> = ({}) => {
  const [, login] = useLoginMutation();
  const router = useRouter();

  const onSubmit = async (
    values: FormModel,
    { setErrors }: FormikHelpers<FormModel>
  ) => {
    const res = await login(values);
    if (res.data?.login.errors?.length) {
      setErrors(toErrorMap(res.data?.login.errors));
    } else if (res.data?.login.user) {
      if (typeof router.query.next === "string") {
        router.push(router.query.next);
      } else {
        router.push("/");
      }
    }
    return res;
  };

  return (
    <Wrapper>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" } as FormModel}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            <InputField label="User Name" name="usernameOrEmail" />
            <InputField label="Password" name="password" type="password" />
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
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);

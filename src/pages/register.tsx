import { Button } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/input";
import Layout from "../components/layout";
import Wrapper from "../components/wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/to-error-map";
import { createUrqlClient } from "../utils/urql-client";

interface Props {}
interface FormModel {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC<Props> = ({}) => {
  const [, register] = useRegisterMutation();
  const router = useRouter();

  const onSubmit = async (
    values: FormModel,
    { setErrors }: FormikHelpers<FormModel>
  ) => {
    const res = await register(values);
    if (res.data?.register.errors?.length) {
      setErrors(toErrorMap(res.data?.register.errors));
    } else if (res.data?.register.user) {
      router.push("/");
    }
    return res;
  };

  return (
    <Layout>
      <Formik
        initialValues={{ username: "", password: "" } as FormModel}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            <InputField label="User Name" name="username" autoComplete="off" />
            <InputField label="Email" name="email" autoComplete="off" />
            <InputField
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
            />
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

export default withUrqlClient(createUrqlClient)(Register);

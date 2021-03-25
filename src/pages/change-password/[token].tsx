import { Alert, AlertIcon, Button } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import InputField from "../../components/input";
import Wrapper from "../../components/wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/to-error-map";
import { createUrqlClient } from "../../utils/urql-client";

interface Props {}

interface FormModel {
  newPassword: string;
}

const ChangePassword: NextPage<Props> = () => {
  const [, changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const [tokenError, setTokenError] = useState("");

  const onSubmit = async (
    values: FormModel,
    { setErrors }: FormikHelpers<FormModel>
  ) => {
    const res = await changePassword({
      newPassword: values.newPassword,
      token: typeof router.query.token === "string" ? router.query.token : "",
    });
    if (res.data?.changePassword.errors?.length) {
      const err = toErrorMap(res.data?.changePassword.errors);
      if ("token" in err) {
        setTokenError(err.token);
      }
      setErrors(err);
    } else if (res.data?.changePassword.user) {
      router.push("/");
    }
    return res;
  };

  const getErrorMessage = () => {};

  return (
    <Wrapper>
      {tokenError !== "" ? (
        <Alert status="error">
          <AlertIcon />
          {tokenError}
        </Alert>
      ) : null}
      <Formik
        initialValues={{ newPassword: "" } as FormModel}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            <InputField label="Password" name="newPassword" type="password" />
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

export default withUrqlClient(createUrqlClient)(ChangePassword);

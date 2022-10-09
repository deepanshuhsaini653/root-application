import React, { useState } from "react";
import { useNavigate } from "react-router";
import { LoginViaPassword } from "./../../components";

const LoginComponent = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const redirectToForgotPasswordHandler = () => navigate("/forgot-password");

  return (
    <LoginViaPassword
      fieldConfig={{ variant: "outlined" }}
      loader={loader}
      hideForgotPassword={true}
      hideRememberMe={true}
      onSubmitData={(data: any) => {
        console.log(data);
        setLoader(true);
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      }}
      redirectToForgotPassword={redirectToForgotPasswordHandler}
    />
  );
};

export const Login = LoginComponent;

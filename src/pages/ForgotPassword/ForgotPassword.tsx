import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ForgotPassword } from "../../components";

const ForgotPasswordComponent = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const redirectToSigninHandler = () => navigate("/login");

  return (
    <div>
      <ForgotPassword
        type="mobile"
        loader={loader}
        onSubmitData={(data: any) => {
          console.log(data);
          setLoader(true);
          setTimeout(() => {
            setLoader(false);
            navigate("/reset-password");
          }, 1000);
        }}
        redirectToSignIn={redirectToSigninHandler}
      />
    </div>
  );
};

export const ForgotPasswordPage = ForgotPasswordComponent;

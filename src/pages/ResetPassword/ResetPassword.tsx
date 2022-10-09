import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ResetPassword } from "../../components";

export default function ResetPasswordPage() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const redirectToSigninHandler = () => navigate("/login");

  return (
    <div>
      <ResetPassword
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
}

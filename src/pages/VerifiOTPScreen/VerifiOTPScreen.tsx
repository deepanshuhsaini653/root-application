import React from "react";
import { VerifiOTP } from "../../components";

export const VerifiOTPScreen = () => {
  const [loader, setLoader] = React.useState(false);

  const resendOtpHandler = () => {};

  const submitHandler = (data: any) => {
    console.log(data);
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };

  return (
    <div>
      <VerifiOTP
        loader={loader}
        isInputNum={false}
        numInputs={6}
        otpDuration={5}
        resendOTPData={resendOtpHandler}
        onSubmitData={submitHandler}
      />
    </div>
  );
};

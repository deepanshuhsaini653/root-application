import React, { FC, useState } from "react";
import { Typography, Box, Grid, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { OtpInput } from "react-mat-otp-input";
export interface IVerifyOTPProps {
  buttonConfig?: any;
  loader?: boolean;
  numInputs?: number;
  otpDuration?: number;
  isInputNum?: boolean;
  subHead?: string;
  onSubmitData: (data: string) => void | undefined;
  resendOTPData: () => void | undefined;
}

export const VerifiOTP: FC<IVerifyOTPProps> = (props): JSX.Element => {
  const {
    loader,
    subHead = "An OTP sent to mobile number XXXXXXXXXX",
    buttonConfig,
    isInputNum = true,
    numInputs = 6,
    otpDuration = 60,
    onSubmitData,
    resendOTPData,
  } = props;

  const [otp, setOtp] = useState<string>("");
  const [counter, setCounter] = React.useState<number>(otpDuration);

  const otpChangeHandler = (event: any) => setOtp(event);
  const sendOTPHandler = () => onSubmitData(otp);

  React.useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const otpResendHandler = () => {
    setOtp("");
    setCounter(otpDuration);
    resendOTPData();
  };

  return (
    <Box>
      <Box sx={{ marginBottom: "3rem", textAlign: "center" }}>
        <Typography
          sx={{
            color: "#63626B",
            fontSize: "1.6rem",
            fontWeight: "bold",
            marginBottom: ".2rem",
          }}
        >
          Verify OTP
        </Typography>
        {!!subHead && (
          <Typography sx={{ color: "#7B7887", fontSize: ".9rem" }}>
            {subHead}
          </Typography>
        )}
      </Box>
      <Grid container>
        <Grid item xs={12} lg={12} pb={4}>
          <Box sx={{ textAlign: "center" }}>
            <OtpInput
              autoFocus
              isNumberInput={isInputNum}
              length={numInputs}
              className="otpContainer"
              inputClassName="otpInput"
              onChangeOTP={otpChangeHandler}
            />
            <Box sx={{ textAlign: "right", paddingTop: ".8rem" }}>
              {counter === 0 && (
                <Button onClick={otpResendHandler}>
                  <Typography
                    sx={{ textTransform: "capitalize", fontSize: ".9rem" }}
                  >
                    Resend OTP
                  </Typography>
                </Button>
              )}
              {counter !== 0 && (
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontSize: ".9rem",
                    color: "#7B7887",
                  }}
                >
                  Request again in {counter} Sec
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            type="submit"
            onClick={sendOTPHandler}
            sx={{
              height: "50px",
              textTransform: "unset",
              boxShadow: "none",
            }}
            disabled={otp.length !== numInputs || loader}
            loading={loader}
            fullWidth
            variant="contained"
            {...buttonConfig}
          >
            <Typography sx={{ fontSize: "1rem" }}>Verify OTP</Typography>
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

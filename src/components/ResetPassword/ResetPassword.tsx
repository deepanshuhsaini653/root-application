import React, { FC, useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Formik } from "formik";
import {
  Grid,
  TextField,
  BaseTextFieldProps,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as yup from "yup";
import { REGREX } from "../../utils/regrex";

export interface IResetPasswordProps {
  fieldConfig?: IFeild;
  loader?: boolean;
  onSubmitData: (data: IFormInputs) => void | undefined;
  redirectToSignIn: () => void | undefined;
}

interface IFeild extends BaseTextFieldProps {}

const schema = yup.object({
  password: yup
    .string()
    .trim()
    .required("Required")
    .matches(
      REGREX.password,
      "Password should contain atleast one capital letter, one small letter, one digit, one special character and must be at least 8 characters and max 15 characters."
    ),
  confirmPassword: yup
    .string()
    .trim()
    .required("Required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

interface IFormInputs {
  password: string;
}

export const ResetPassword: FC<IResetPasswordProps> = (props) => {
  const { fieldConfig, onSubmitData, loader, redirectToSignIn } = props;

  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [visibleConfPassword, setVisibleConfPassword] =
    useState<boolean>(false);
  const viewPasswordHandler = () => setVisiblePassword(!visiblePassword);
  const viewConfPasswordHandler = () =>
    setVisibleConfPassword(!visibleConfPassword);

  const onSubmitHandler = (values: IFormInputs, actions: any) => {
    onSubmitData(values);
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
          Create New Password
        </Typography>
        <Typography sx={{ color: "#7B7887", fontSize: ".9rem" }}>
          Your new password must be diffrent from previous used password.
        </Typography>
      </Box>
      <Formik
        validationSchema={schema}
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={onSubmitHandler}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12} lg={12} pb={4}>
                <TextField
                  type={visiblePassword ? "text" : "password"}
                  fullWidth
                  id="password"
                  label="Enter new password*"
                  variant="outlined"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.password && touched.password}
                  helperText={touched.password && errors.password}
                  value={values.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={viewPasswordHandler}
                          edge="end"
                        >
                          {visiblePassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...fieldConfig}
                />
              </Grid>
              <Grid item xs={12} lg={12} pb={6}>
                <TextField
                  type={visibleConfPassword ? "text" : "password"}
                  fullWidth
                  id="confirmPassword"
                  label="Enter confirm password*"
                  variant="outlined"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.confirmPassword && touched.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  value={values.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={viewConfPasswordHandler}
                          edge="end"
                        >
                          {visibleConfPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...fieldConfig}
                />
              </Grid>

              <Grid item xs={12}>
                <LoadingButton
                  type="submit"
                  sx={{
                    height: "50px",
                    textTransform: "unset",
                    boxShadow: "none",
                  }}
                  disabled={!isValid || loader}
                  loading={loader}
                  fullWidth
                  variant="contained"
                >
                  <Typography sx={{ fontSize: "1rem" }}>
                    Reset password
                  </Typography>
                </LoadingButton>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    color: "#686868",
                    fontSize: ".9rem",
                    textAlign: "center",
                    marginTop: "3rem",
                  }}
                >
                  Know your password?{" "}
                  <Button onClick={() => redirectToSignIn()}>
                    <Typography
                      sx={{
                        color: "#2477DB",
                        textTransform: "capitalize",
                      }}
                    >
                      Please Sign in
                    </Typography>
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
};

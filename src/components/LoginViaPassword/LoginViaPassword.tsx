import React, { useState } from "react";
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
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as yup from "yup";
import { REGREX } from "../../utils/regrex";

export interface ILoginViaPasswordProps {
  fieldConfig?: IFeild;
  fieldGutter?: number;
  loader?: boolean;
  subHead?: string;
  onSubmitData?: (data: IFormInputs) => void | undefined;
  redirectToForgotPassword?: () => void | undefined;
  hideForgotPassword?: boolean;
  hideRememberMe?: boolean;
}

interface IFeild extends BaseTextFieldProps {}

const schema = yup.object({
  email: yup.string().required("Required").email("Enter valid email id"),
  password: yup
    .string()
    .trim()
    .required("Required")
    .matches(
      REGREX.password,
      "Password should contain atleast one capital letter, one small letter, one digit, one special character and must be at least 8 characters and max 15 characters."
    ),
});

interface IFormInputs {
  email: string;
  password: string;
}

export const LoginViaPassword: React.FC<any> = (props): JSX.Element => {
  const {
    fieldConfig,
    onSubmitData,
    loader,
    redirectToForgotPassword,
    hideForgotPassword = true,
    hideRememberMe = true,
    subHead = "Powered by ABC Group of Institutions",
  } = props;
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const viewPasswordHandler = () => setVisiblePassword(!visiblePassword);

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
          Sign in to your Account
        </Typography>
        {!!subHead && (
          <Typography sx={{ color: "#7B7887", fontSize: ".9rem" }}>
            {subHead}
          </Typography>
        )}
      </Box>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
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
                  fullWidth
                  id="email"
                  label="Enter Email id*"
                  variant="outlined"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.email && touched.email}
                  helperText={touched.email && errors.email}
                  value={values.email}
                  {...fieldConfig}
                />
              </Grid>
              <Grid item xs={12} lg={12} pb={1}>
                <TextField
                  type={visiblePassword ? "text" : "password"}
                  fullWidth
                  id="password"
                  label="Enter password*"
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
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={2} pb={6} sx={{ textAlign: "left" }}>
                  {!!hideRememberMe && (
                    <FormControlLabel
                      sx={{ color: "#7B7887", userSelect: "none" }}
                      control={<Checkbox />}
                      label="Remember me"
                    />
                  )}
                </Grid>
                <Grid item xs={8} pb={6} sx={{ textAlign: "right" }}>
                  {!!hideForgotPassword && (
                    <Button
                      sx={{ textTransform: "unset", boxShadow: "none" }}
                      onClick={() => redirectToForgotPassword()}
                    >
                      <Typography sx={{ fontSize: ".9rem", color: "#1447F7" }}>
                        Forgot password?
                      </Typography>
                    </Button>
                  )}
                </Grid>
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
                  <Typography sx={{ fontSize: "1rem" }}>Sign in</Typography>
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
};

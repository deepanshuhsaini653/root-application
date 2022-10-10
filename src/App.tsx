import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ForgotPasswordPage, Login, VerifiOTPScreen } from "./pages";
import ResetPasswordPage from "./pages/ResetPassword/ResetPassword";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/forgot-password"} element={<ForgotPasswordPage />} />
          <Route path={"/reset-password"} element={<ResetPasswordPage />} />
          <Route path={"/verify-otp"} element={<VerifiOTPScreen />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;

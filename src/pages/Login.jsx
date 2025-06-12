import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./Login.scss";
import AuthService from "../service/AuthService";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Buttons";
import UserService from "../service/UserService";
import { useUserStore } from "../store/userStore";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format!" }),
  password: z
    .string()
    .min(6, { message: "Password must have at least 6 characters!" }),
});

const Login = () => {
  const methods = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    setServerError("");

    try {
      const payload = {
        identity: formData.email,
        password: formData.password,
      };

      const response = await AuthService.login(payload);

      if (response.data && response.data.accessToken) {
        console.log("Login successful", response.data);
        localStorage.setItem("accessToken", response.data.accessToken);

        const userResponse = await UserService.getCurrentUser();
        useUserStore.getState().setUserData(userResponse.data.data);

        navigate("/");
      } else {
        setServerError("Invalid login credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setServerError("Login failed!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-description">
          <div className="logo-text">
            <img src="/assets/images/check-logo.png" alt="Logo" />
            <p>Project Management App</p>
          </div>
          <div className="login-text">
            <h3>Everything you need in one place</h3>
            <p>
              Manage your boards using Drag-n-Drop, create additional boards and
              tasks.
            </p>
          </div>
        </div>
        <div className="login-form">
          <div className="icon-x">
            <img src="/assets/images/x.png" alt="Close" />
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-content">
                <h3>Log in to your account</h3>
                <InputField label="Email" type="text" name="email" />
                <InputField label="Password" type="password" name="password" />
                {serverError && <p style={{ color: "red" }}>{serverError}</p>}
                <div className="dont-have-account">
                  Don't have an account? <a href="/signup">Sign up</a>
                </div>
              </div>
            </form>
          </FormProvider>
          <Button
            type="submit"
            className="form-btn"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

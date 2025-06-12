import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./SignUp.scss";
import AuthService from "../service/AuthService";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Buttons";

const signUpSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must have at least 3 characters!" }),
  lastName: z
    .string()
    .min(3, { message: "Last name must have at least 3 characters!" }),
  email: z.string().email({ message: "Invalid email format!" }),
  username: z
    .string()
    .min(3, { message: "Username must have at least 3 characters!" }),
  password: z
    .string()
    .min(6, { message: "Password must have at least 6 characters!" })
    .regex(/[A-Z]/, {
      message: "Must have at least one uppercase letter!",
    })
    .regex(/\d/, { message: "There must be at least one number!" })
    .regex(/[!@#$%^&*]/, {
      message: "It must contain at least one special character (!@#$%^&*)!",
    }),
});

const SignUp = () => {
  const methods = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await AuthService.signup(data);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <div className="signup-description">
          <div className="signup-logo-text">
            <img src="/assets/images/check-logo.png" alt="" />
            <p>Project Management App</p>
          </div>
          <div className="signup-text">
            <h3>Everything you need in one place</h3>
            <p>
              Manage your boards using Drag-n-Drop, create additional boards and
              tasks.
            </p>
          </div>
        </div>
        <div className="signup-form">
          <div className="icon-x">
            <img src="/assets/images/x.png" alt="" />
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-content">
                <h3>Sign Up</h3>
                <InputField label="First Name" name="firstName" />
                <InputField label="Last Name" name="lastName" />
                <InputField label="Email" name="email" type="email" />
                <InputField label="Username" name="username" />
                <InputField label="Password" name="password" type="password" />
                <div className="have-account">
                  Already have an account? <a href="/login">Sign in</a>
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
            {isSubmitting ? "Creating Account..." : "Create an Account"}
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;

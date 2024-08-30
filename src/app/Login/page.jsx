"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../../styles/login.module.css";
import mainStyles from "../page.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingSpinner from "../components/LoadingSpinner";
import * as Yup from "yup";

const schema = Yup.object().shape({
  createEmail: Yup.string()
    .email("Email must be a valid email")
    .required("Email is a required field"),
  createPassword: Yup.string()
    .required("Password has to be between 9 & 20")
    .min(9, "password must be between 9 & 20 characters")
    .max(20, "password must be between 9 & 20 characters"),
  address: Yup.string(),
  postalCode: Yup.string()
    .test(
      "len",
      "Postal code must be a valid postal code",
      (val) => val.length === 5
    )
    .matches(/^\d+$/, "Postal code must be a number"),
  city: Yup.string().required("City is a required field"),
  country: Yup.string().required("Country is a required field"),
});

const Login = () => {
  const [forgotPasswordInput, setForgotPasswordInput] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [resetPasswordError, setResetPasswordError] = useState("");
  const [resetPasswordResponseEmail,setResetPasswordResponseEmail] = useState("")
  const [registerError, setRegisterError] = useState("");
  const [resetPasswordResponse, setResetPasswordResponse] = useState("");
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  async function submitLoginUser() {
    try {
      setIsLoadingLogin(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      const data = await response.json();
      setIsLoadingLogin(false);
      if (data.message === "Incorrect username or password") {
        setLoginError("Incorrect username or password");
      }
    } catch (error) {
      setLoginError(error.message);
    }
  }

  const submitResetPassword = async (resetPasswordEmail) => {
    setIsLoadingLogin(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/send-reset-password-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: resetPasswordEmail,
          }),
        }
      );
      const responseData = await response.json();
      setIsLoadingLogin(false);
      if (responseData.error) {
        setResetPasswordError(responseData.error);
      } else if (responseData.message && responseData.email) {
        setResetPasswordResponse(responseData.message);
        setResetPasswordResponseEmail(responseData.email);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitRegisterUser = async (value) => {
    try {
      setIsLoadingRegister(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            createEmail: value.createEmail,
            createPassword: value.createPassword,
            address: value.address,
            postalCode: value.postalCode,
            city: value.city,
            country: value.country,
          }),
        }
      );
      const responseData = await response.json();
      setIsLoadingRegister(false);
      if (responseData.error) {
        setRegisterError(responseData.error);
      } else if (responseData.url) {
        router.push(responseData.url);
      }
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.loginRegisterContainer} ${
          isLoadingLogin ? styles.pulse : ""
        }`}
      >
        <h2 style={{ margin: "10px" }}>Login</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submitLoginUser();
          }}
          className={styles.loginForm}
        >
          <label className={styles.label}>Email:</label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            className={styles.loginInput}
          />
          <label className={styles.label}>Password:</label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            type="password"
            className={styles.loginInput}
          />
          <div
            style={{
              display: "Flex",
              flexDirection: "Column",
              alignItems: "flex-start",
            }}
          >
            {loginError && (
              <p style={{ color: "red", marginBottom: "10px" }}>{loginError}</p>
            )}
            <button type="submit" className={styles.buttonLogin}>
              Login
            </button>
            <button
              onClick={() => setForgotPasswordInput(true)}
              style={{ padding: "10px" }}
            >
              Forgot password?
            </button>
          </div>
        </form>
        <form
          className={styles.loginForm}
          onSubmit={(event) => {
            event.preventDefault();
            submitResetPassword(resetPasswordEmail);
          }}
        >
          {forgotPasswordInput && (
             
          
                <p className={mainStyles.rowSpace}>
                  Please provide your email address and we will send an email
                  for resetting your password
                </p>
              
          )}
          {forgotPasswordInput && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
              }}
            >
              <input
                type="email"
                className={styles.loginInput}
                {...register("resetPasswordEmail")}
                onChange={(event) => {
                  setResetPasswordEmail(event.target.value);
                }}
              />

              {resetPasswordError && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "5px",
                    paddingLeft: "10px",
                  }}
                >
                  {resetPasswordError}
                </p>
              )}
 {resetPasswordResponse && 
                <p style={{ marginBottom: "10px", paddingLeft: "10px" }}>
                  {resetPasswordResponse}<u style={{ marginBottom: "10px", paddingLeft: "10px", fontWeight: "bold" }}>&nbsp;{resetPasswordResponseEmail} </u>
                </p>}
           
              <button className={styles.buttonLogin} type="submit">
                Send
              </button>
            </div>
          )}
        </form>
        {isLoadingLogin && <LoadingSpinner />}
      </div>
      <div
        className={`${styles.loginRegisterContainer} ${
          isLoadingRegister ? styles.pulse : ""
        }`}
      >
        <h2 style={{ margin: "10px" }}>Register</h2>
        <form
          onSubmit={handleSubmit(submitRegisterUser)}
          className={styles.registrationForm}
        >
          <div>
            <label className={styles.label}>
              Email:
              <span style={{ color: "red", marginTop: -15 }}>* </span>
            </label>
            <input
              {...register("createEmail", { required: "createEmail" })}
              type="email"
              className={styles.registerInput}
            />
            {errors.createEmail && (
              <p style={{ color: "red", marginTop: -15 }}>
                {errors.createEmail.message}
              </p>
            )}
          </div>
          <div>
            <label className={styles.label}>
              Password:<span style={{ color: "red", marginTop: -15 }}>*</span>
            </label>
            <input
              {...register("createPassword", { required: "createPassword" })}
              type="password"
              className={styles.registerInput}
              autoComplete="new-password"
            />
            {errors.createPassword && (
              <p style={{ color: "red", marginTop: -15 }}>
                {errors.createPassword.message}
              </p>
            )}
          </div>
          <div>
            <label className={styles.label}>Address:</label>
            <input
              {...register("address")}
              type="text"
              className={styles.registerInput}
            />
          </div>
          <div>
            <label className={styles.label}>
              Postal code:
              <span style={{ color: "red", marginTop: -15 }}>*</span>
            </label>
            <input
              {...register("postalCode", { required: "postalCode" })}
              type="number"
              className={styles.registerInput}
            />
            {errors.postalCode && (
              <p style={{ color: "red", marginTop: -15 }}>
                {errors.postalCode.message}
              </p>
            )}
          </div>
          <div>
            <label className={styles.label}>
              City:<span style={{ color: "red", marginTop: -15 }}>*</span>
            </label>
            <input
              {...register("city", { required: "city" })}
              type="text"
              className={styles.registerInput}
            />{" "}
            {errors.city && (
              <p style={{ color: "red", marginTop: -15 }}>
                {errors.city.message}
              </p>
            )}
          </div>
          <div>
            <label className={styles.label}>
              Country:<span style={{ color: "red", marginTop: -15 }}>*</span>
            </label>
            <input
              {...register("country", { required: "country" })}
              type="text"
              className={styles.registerInput}
            />
            {errors.country && (
              <p style={{ color: "red", marginTop: -15 }}>
                {errors.country.message}
              </p>
            )}
          </div>
          <div style={{ alignItems: "center", height: "auto" }}>
            {" "}
            {registerError && (
              <span className={styles.registerErrorMain}>{registerError} </span>
            )}
            <button
              type="submit"
              title="Enter required fields (*)"
              className={styles.buttonRegister}
              disabled={!isValid}
            >
              Register
            </button>
            {isLoadingRegister && <LoadingSpinner />}
          </div>
        </form>
      </div>{" "}
    </div>
  );
};
export default Login;

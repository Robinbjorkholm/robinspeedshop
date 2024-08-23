"use client";
import React, { useState } from "react";
import styles from "../../styles/Login.module.css";
import mainStyles from "../page.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingSpinner from "../components/LoadingSpinner";
import * as Yup from "yup";

const schema = Yup.object().shape({
  createEmail: Yup.string()
    .email("Email must be a valid email")
    .required("Email is a required field"),
  createPassword: Yup.string().required("Password has to be between 9 & 20"),
  address: Yup.string(),
  postalCode: Yup.number("Postal code must be a number")
    .positive("Postal code must be a valid number1")
    .typeError("Postal code is a required field"),

  city: Yup.string().required("City is a required field"),
  country: Yup.string().required("Country is a required field"),
});
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordInput, setForgotPasswordInput] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  async function submitLoginUser(event) {
    event.preventDefault();
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
            email,
            password,
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

  const submitResetPassword = async (value) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: value.email,
          }),
        }
      );
      const data = await response.json();
      if (data.message === "Email already exist") {
        setRegisterError("Email already exists");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      setRegisterError(error.message);
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
      const data = await response.json();
      setIsLoadingRegister(false);
      if (data.message === "Email already exist") {
        setRegisterError("Email already exists");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div  className={`${styles.loginRegisterContainer} ${isLoadingLogin ? styles.pulse : ""}`}
    >
        <h2 style={{ margin: "10px" }}>Login</h2>
        <form onSubmit={submitLoginUser} className={styles.loginForm}>
          <label className={styles.label}>Email:</label>
          <input
            {...register("email")}
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            className={styles.loginInput}
          />
          <label className={styles.label}>Password:</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className={styles.loginInput}
          />
          <div
            style={{
              display: "Flex",
              flexDirection: "Column",
              alignItems: "flex-start",
            }}
          >
            <button type="submit" className={styles.buttonLogin}>
              Login
            </button>
            {loginError && (
              <p style={{ color: "red", marginTop: "10px" }}>{loginError}</p>
            )}

            <button
              onClick={() => setForgotPasswordInput(true)}
              style={{ padding: "10px" }}
              >
              Forgot password?
            </button>
          </div>
          {forgotPasswordInput && (
            <p className={mainStyles.rowSpace}>
              Please provide your email address and we will send an email for
              resetting your password
            </p>
          )}
          {forgotPasswordInput && (
            <form
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
            }}
            onSubmit={submitResetPassword}
            >
              <input
                {...register("email")}
                type="email"
                className={styles.loginInput}
                onChange={(event) => setEmail(event.target.value)}
                />{" "}
              <button className={styles.buttonLogin}>Send</button>
            </form>
          )}
        </form>
        {isLoadingLogin && <LoadingSpinner />}
      </div>
      <div className={`${styles.loginRegisterContainer} ${isLoadingRegister ? styles.pulse : ""}`}>
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
              onChange={(event) => setCreateEmail(event.target.value)}
            />
            {errors.createEmail && (
              <p style={{ color: "red", marginTop: -15 }}>
                {errors.createEmail.message}
              </p>
            )}
            {}
          </div>
          <div>
            <label className={styles.label}>
              Password:<span style={{ color: "red", marginTop: -15 }}>*</span>
            </label>
            <input
              {...register("createPassword", { required: "createPassword" })}
              type="password"
              onChange={(event) => setCreatePassword(event.target.value)}
              className={styles.registerInput}
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
              onChange={(event) => setAddress(event.target.value)}
              className={styles.registerInput}
            />
          </div>
          <div>
            <label className={styles.label}>
              Postal Code:
              <span style={{ color: "red", marginTop: -15 }}>*</span>
            </label>
            <input
              {...register("postalCode", { required: "postalCode" })}
              type="number"
              onChange={(event) => setPostalCode(event.target.value)}
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
              onChange={(event) => setCity(event.target.value)}
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
              onChange={(event) => setCountry(event.target.value)}
              className={styles.registerInput}
            />
            {errors.country && (
              <p style={{ color: "red", marginTop: -15 }}>
                {errors.country.message}
              </p>
            )}
          </div>
          <div style={{ alignItems: "center" }}>
            {" "}
            <button
              type="submit"
              title="Enter required fields (*)"
              className={styles.buttonRegister}
              disabled={!isDirty}
              >
              Register
            </button>
            {registerError && (
              <span className={styles.registerErrorMain}>{registerError} </span>
            )}
            {isLoadingRegister && <LoadingSpinner />}
          </div>
        </form>
      </div>{" "}
    </div>
  );
};
export default Login;

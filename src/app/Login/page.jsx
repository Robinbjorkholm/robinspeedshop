"use client";
import React, { useState } from "react";
import styles from "../../styles/Login.module.css";
import mainStyles from "../page.module.css";
import LoginApi from "../api/LoginApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
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
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  /*function submitLoginUser(event) {
    event.preventDefault();
    handleSubmit(
      LoginApi(email, password).then((response) => {
        setLoginError(response);
      })
    );
  }
*/
  async function submitRegisterUser(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            createEmail,
            createPassword,
            address,
            postalCode,
            city,
            country,
          }),
        }
      );
      const data = await response.json();
      if (data.message === "Email already exist") {
        setRegisterError("Email already exists");
      } else {
        // User created successfully
        console.log(data.message);
      }
    } catch (error) {
      setRegisterError(error.message);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <h2>Login</h2>
        <form>
          <label className={styles.label}>Email:</label>
          <input
            {...register("email")}
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            className={styles.input}
          />
          <label className={styles.label}>Password:</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Login
          </button>
          {loginError && (
            <p className="login-form-error-message">{loginError}</p>
          )}
          <button
            onClick={() => setForgotPasswordInput(true)}
            style={{ padding: "10px" }}
          >
            Forgot password?
          </button>
          {forgotPasswordInput && (
            <p className={mainStyles.rowSpace}>
              Enter your email and we will resend your password
            </p>
          )}
          {forgotPasswordInput && (
            <div>
              <label className={styles.label}>Email:</label>
              <input
                {...register("email")}
                type="email"
                className={styles.input}
                onChange={(event) => setEmail(event.target.value)}
              />{" "}
              <button className={styles.button}>Send</button>
            </div>
          )}
        </form>
      </div>
      <div>
        <form onSubmit={submitRegisterUser} className={styles.registrationForm}>
          <div>
            <label className={styles.label}>
              Email:
              <span style={{ color: "red", marginTop: -15 }}>* </span>
            </label>
            <input
              {...register("createEmail", { required: "createEmail" })}
              type="email"
              className={styles.input}
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
              className={styles.input}
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
              className={styles.input}
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
              className={styles.input}
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
              className={styles.input}
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
              className={styles.input}
            />
            {errors.country && (
              <p style={{ color: "red", marginTop: -15 }}>
                {errors.country.message}
              </p>
            )}
          </div>
          <div>
            {" "}
            <button
              type="submit"
              title="Enter required fields (*)"
              className={styles.button}
              disabled={!isDirty}
            >
              Register
            </button>
            {registerError && (
              <span className={styles.registerErrorMain}>{registerError} </span>
            )}
          </div>
        </form>
      </div>{" "}
    </div>
  );
};
export default Login;

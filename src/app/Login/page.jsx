"use client";
import React, { useState } from "react";
import styles from "../../styles/Login.module.css";
import mainStyles from "../page.module.css";
import RegisterApi from "../api/Register";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  address: Yup.string(),
  postalCode: Yup.number().required(),
  city: Yup.string().required(),
  country: Yup.string().required(),
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  function submitLoginUser(event) {
    event.preventDefault();
    handleSubmit(
      RegisterApi(email, password, address, postalCode, city, country).then(
        (response) => {
          setLoginError(response);
        }
      )
    );
  }
  
  function submitRegisterUser(event) {
    event.preventDefault();
    handleSubmit(
      RegisterApi(email, password, address, postalCode, city, country).then(
        (response) => {
          setRegisterError(response);
        }
      )
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <h2>Login</h2>
        <form onSubmit={submitLoginUser}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            className={styles.input}
            {...register("email")}
          />
          <label className={styles.label}>Password:</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className={styles.input}
            {...register("password")}
          />
          <button type="submit" className={styles.button}>
            Login
          </button>
          {loginError && (
            <p className="login-form-error-message">{loginError}</p>
          )}
          <button
            onClick={() => setForgotPassword(true)}
            style={{ padding: "10px" }}
          >
            Forgot password?
          </button>
          {forgotPassword && (
            <p className={mainStyles.rowSpace}>
              Enter your email and we will resend your password
            </p>
          )}
          {forgotPassword && (
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
          <div className={mainStyles.flexColumn}>
            <label className={styles.label}>
              Email:<span style={{ color: "red" }}>*</span>
            </label>
            <input
              {...register("email", { required: "email" })}
              type="email"
              className={styles.input}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className={mainStyles.flexColumn}>
            <label className={styles.label}>
              Password:<span style={{ color: "red" }}>*</span>
            </label>
            <input
              {...register("password", { required: "password" })}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              className={styles.input}
            />
          </div>
          <div className={mainStyles.flexColumn}>
            <label className={styles.label}>Address:</label>
            <input
              {...register("address")}
              type="text"
              onChange={(event) => setAddress(event.target.value)}
              className={styles.input}
            />
          </div>
          <div className={mainStyles.flexColumn}>
            <label className={styles.label}>
              Postal Code:<span style={{ color: "red" }}>*</span>
            </label>
            <input
              {...register("postalCode", { required: "postalCode" })}
              type="number"
              onChange={(event) => setPostalCode(event.target.value)}
              className={styles.input}
            />
          </div>
          <div className={mainStyles.flexColumn}>
            <label className={styles.label}>
              City:<span style={{ color: "red" }}>*</span>
            </label>
            <input
              {...register("city", { required: "city" })}
              type="text"
              onChange={(event) => setCity(event.target.value)}
              className={styles.input}
            />{" "}
          </div>
          <div className={mainStyles.flexColumn}>
            <label className={styles.label}>
              Country:<span style={{ color: "red" }}>*</span>
            </label>
            <input
              {...register("country", { required: "country" })}
              type="text"
              onChange={(event) => setCountry(event.target.value)}
              className={styles.input}
            />
          </div>

          {registerError && (
            <p className="login-form-error-message">{registerError}</p>
          )}
          <button type="submit" className={styles.button}>
            Register
          </button>
        </form>
      </div>{" "}
    </div>
  );
};
export default Login;

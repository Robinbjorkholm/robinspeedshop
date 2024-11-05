"use client";
import React, {useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import countries from "countries-list";
import mainStyles from "@/styles/page.module.css";
import styles from "../../styles/login.module.css";
import { useForm } from "react-hook-form";

function LoginForm() {
  const [togglePasswordInput, setTogglePasswordInput] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [toggleShowPassword, setTogglePasswordLogin] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState("");
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState("");
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingResetPassword, setisLoadingResetPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function submitLoginUser(value) {
    try {
      setIsLoadingLogin(true);

      const result = await signIn("credentials", {
        email: value.email,
        password: value.password,
        redirect: false,
      });
      setIsLoadingLogin(false);
      if (result.error) {
        setLoginError(result.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      setLoginError(error.message);
    }
  }

  const submitResetPassword = async (value) => {
    setisLoadingResetPassword(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/user/send-reset-password-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: value.resetPasswordEmail,
          }),
        }
      );
      const responseData = await response.json();
      setisLoadingResetPassword(false);
      if (responseData.error) {
        setResetPasswordError(responseData.error);
      } else if (responseData.message) {
        setResetPasswordSuccess(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`${styles.loginRegisterContainer} ${
        isLoadingLogin ? styles.pulse : ""
      }`}
    >
      <h2 style={{ margin: "10px" }}>Login</h2>
      <form
        onSubmit={handleSubmit(submitLoginUser)}
        className={styles.loginForm}
      >
        <label className={styles.label}>Email:</label>
        <div style={{ position: "relative", width: "65%" }}>
          <input
            {...register("email")}
            type="email"
            className={styles.loginInput}
          />
        </div>
        <label className={styles.label}>Password:</label>
        <div style={{ position: "relative", width: "65%" }}>
          <input
            {...register("password")}
            autoComplete="current-password"
            type={!toggleShowPassword ? "password" : "text"}
            className={styles.loginInput}
          />
          {toggleShowPassword ? (
            <FaRegEyeSlash
              className={styles.showPasswordLogin}
              onClick={() => setTogglePasswordLogin(!toggleShowPassword)}
            />
          ) : (
            <FaEye
              className={styles.showPasswordLogin}
              onClick={() => setTogglePasswordLogin(!toggleShowPassword)}
            />
          )}
        </div>
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
          {!isLoadingLogin ? (
            <button className={styles.buttonLogin} type="submit">
              Login
            </button>
          ) : (
            <button
              className={styles.buttonLogin}
              type="submit"
              disabled={true}
            >
              Logging in..
            </button>
          )}
          <button
            onClick={() => setTogglePasswordInput(true)}
            style={{ padding: "10px" }}
          >
            Forgot password?
          </button>
        </div>
      </form>
      <form
        className={styles.loginForm}
        onSubmit={handleSubmit(submitResetPassword)}
      >
        {togglePasswordInput && (
          <p className={mainStyles.rowSpace}>
            Please provide your email address and we will send an email for
            resetting your password
          </p>
        )}
        {togglePasswordInput && (
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
            {resetPasswordSuccess && (
              <p
                style={{
                  marginBottom: "5px",
                  paddingLeft: "10px",
                }}
              >
                {resetPasswordSuccess}
              </p>
            )}

            {!isLoadingResetPassword ? (
              <button className={styles.buttonLogin} type="submit">
                Send
              </button>
            ) : (
              <button
                className={styles.buttonLogin}
                type="submit"
                disabled={true}
              >
                Sending...
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginForm;

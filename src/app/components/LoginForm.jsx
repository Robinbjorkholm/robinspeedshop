"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  const pathname = usePathname();
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
        if (pathname === "/checkout") {
          router.push("/checkout");
        } else router.push("/");
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
      <div className={styles.loginForm}>
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
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {loginError && (
            <p style={{ color: "red", marginBottom: "10px" }}>{loginError}</p>
          )}
          <button
            className={styles.buttonLogin}
            onClick={handleSubmit(submitLoginUser)}
            disabled={isLoadingLogin}
          >
            {isLoadingLogin ? "Logging in..." : "Login"}
          </button>
          <button
            onClick={() => setTogglePasswordInput(true)}
            style={{ padding: "10px" }}
          >
            Forgot password?
          </button>
        </div>
      </div>
      {togglePasswordInput && (
        <div className={styles.loginForm}>
          {(!resetPasswordError || !resetPasswordSuccess) && (
            <p className={mainStyles.rowSpace}>
              Please provide your email address, and we will send an email to
              reset your password.
            </p>
          )}
          {resetPasswordError && (
            <p className={mainStyles.rowSpace} style={{color:"red"}}>{resetPasswordError}</p>
          )}
          {resetPasswordSuccess && (
            <p className={mainStyles.rowSpace} >{resetPasswordSuccess}</p>
          )}
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
            <button
              className={styles.buttonLogin}
              onClick={handleSubmit(submitResetPassword)}
              disabled={isLoadingResetPassword}
            >
              {isLoadingResetPassword ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;

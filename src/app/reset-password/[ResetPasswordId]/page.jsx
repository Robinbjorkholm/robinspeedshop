"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "../../../styles/login.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import LoadingSpinner from "../../components/LoadingSpinner";
const schema = Yup.object().shape({
  password: Yup.string()
    .required()
    .min(9, "Password must be between 9 & 20 characters")
    .max(20, "Password must be between 9 & 20 characters"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

function ResetPassword({ params }) {
  const { ResetPasswordId } = params;
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  async function submitResetPassword(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/user/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: ResetPasswordId,
            password: password,
          }),
        }
      );
      const responseData = await response.json();
      setIsLoading(false);
      if (responseData.error) {
        setError(responseData.error);
      }
      if (responseData.message) {
        setError(responseData.message);
      }
    } catch (error) {
      setError("Server error", responseData.error);
    }
  }

  return (
    <div
      className={`${styles.resetPasswordContainer} ${
        isLoading ? styles.pulse : ""
      }`}
    >
      <form onSubmit={submitResetPassword} style={{ padding: "10px" }}>
        <h2>Change your password</h2>
        <h3>Enter a new password below</h3>
        <label htmlFor="NewPassword" className={styles.label}>
          New password
        </label>
        <input
          autoComplete="new-password"
          {...register("password")}
          id="NewPassword"
          placeholder="Password has to be between 9 & 20 characters "
          type="password"
          className={styles.registerInput}
          onChange={(event) => setPassword(event.target.value)}
        />{" "}
        {errors.password && (
          <p style={{ color: "red", marginTop: -15 }}>
            {errors.password.message}
          </p>
        )}
        <div>
          <label htmlFor="ConfirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <input
            autoComplete="new-password"
            {...register("confirmPassword")}
            id="ConfirmPassword"
            placeholder="Passwords must match "
            type="password"
            className={styles.registerInput}
          />{" "}
          {errors.confirmPassword && (
            <p style={{ color: "red", marginTop: -15 }}>
              {errors.confirmPassword.message}
            </p>
          )}
          <div>
            {isLoading && <LoadingSpinner />}
            <button
              className={styles.buttonRegister}
              type="submit"
              disabled={!isValid}
            >
              Reset Password
            </button>
          </div>
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default ResetPassword;

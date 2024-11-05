"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import countries from "countries-list";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import mainStyles from "@/styles/page.module.css";
import styles from "../../styles/login.module.css";
import { useForm } from "react-hook-form";
import LoginForm from "../components/LoginForm";

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
  firstName: Yup.string()
    .required("First name is a required field")
    .min(1)
    .max(35),
  lastName: Yup.string()
    .required("Last name is a required field")
    .min(1)
    .max(40),
});

const Login = () => {
  const [forgotPasswordInput, setForgotPasswordInput] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [resetPasswordError, setResetPasswordError] = useState("");
  const [resetPasswordResponseEmail, setResetPasswordResponseEmail] =
    useState("");
  const [registerError, setRegisterError] = useState("");
  const [resetPasswordResponse, setResetPasswordResponse] = useState("");
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingResetPassword, setisLoadingResetPassword] = useState(false);
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

  const submitRegisterUser = async (value) => {
    try {
      setIsLoadingRegister(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api
        /auth/register`,
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
            firstName: value.firstName,
            lastName: value.lastName,
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
      <LoginForm />
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
                {errors.createEmail?.message}
              </p>
            )}
          </div>
          <div>
            <label className={styles.label}>
              Password:<span style={{ color: "red", marginTop: -15 }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <input
                {...register("createPassword", { required: "createPassword" })}
                type={!showPasswordRegister ? "password" : "text"}
                className={styles.registerInput}
                autoComplete="new-password"
              />
              {showPasswordRegister ? (
                <FaRegEyeSlash
                  className={styles.showPasswordRegister}
                  onClick={() => setShowPasswordRegister(!showPasswordRegister)}
                />
              ) : (
                <FaEye
                  className={styles.showPasswordRegister}
                  onClick={() => setShowPasswordRegister(!showPasswordRegister)}
                />
              )}
            </div>
            {errors.createPassword && (
              <p style={{ color: "red", marginTop: -40 }}>
                {errors.createPassword?.message}
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
                {errors.postalCode?.message}
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
                {errors.city?.message}
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
                {errors.country?.message}
              </p>
            )}
          </div>
          <div>
            <label className={styles.label}>
              First name:<span style={{ color: "red", marginTop: -15 }}>*</span>
            </label>

            <input
              {...register("firstName", { required: "firstName" })}
              type="text"
              className={styles.registerInput}
            />

            {errors.firstName && (
              <p style={{ color: "red", marginTop: -15 }}>
                {errors.firstName?.message}
              </p>
            )}
          </div>
          <div>
            <label className={styles.label}>
              Last name:<span style={{ color: "red", marginTop: -15 }}>*</span>
            </label>

            <input
              {...register("lastName", { required: "lastName" })}
              type="text"
              className={styles.registerInput}
            />

            {errors.lastName && (
              <p style={{ color: "red", marginTop: -15 }}>
                {errors.lastName?.message}
              </p>
            )}
          </div>

          <div style={{ alignItems: "center", height: "auto" }}>
            {" "}
            {registerError && (
              <span className={styles.registerErrorMain}>{registerError} </span>
            )}
            {!isLoadingRegister ? (
              <button
                type="submit"
                title="Enter required fields (*)"
                className={styles.buttonRegister}
                disabled={!isValid}
              >
                Register
              </button>
            ) : (
              <button
                type="submit"
                title="Enter required fields (*)"
                className={styles.buttonRegister}
                disabled={true}
              >
                Creating account...
              </button>
            )}
          </div>
        </form>
      </div>{" "}
    </div>
  );
};
export default Login;

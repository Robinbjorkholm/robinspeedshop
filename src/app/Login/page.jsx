"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "../../styles/login.module.css";
import { useForm } from "react-hook-form";
import LoginForm from "../components/LoginForm";
import capitalFirstLetter from "@/lib/capitalFirstLetter"

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email")
    .required("Email is a required field"),
  createPassword: Yup.string()
    .required("Password has to be between 9 & 20")
    .min(9, "password must be between 9 & 20 characters")
    .max(20, "password must be between 9 & 20 characters"),
  address: Yup.string().required().min(1),
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
    .min(1,"First name must be between 1 and 35 characters")
    .max(35,"First name must be between 1 and 35 characters"),
  lastName: Yup.string()
    .required("Last name is a required field")
    .min(1, "Last name must be between 1 and 40 characters")
    .max(40, "Last name must be between 1 and 40 characters"),
});

//This page handles the Login and Registering of users
function Login(){
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  useState("");
  const [registerError, setRegisterError] = useState("");
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const submitRegisterUser = async (value) => {
    try {
      setIsLoadingRegister(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: value.email,
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
        // if the user succesfully creates an account the api returns a url to the "verification-email-sent/their unique id " with a unique - 
        // token which will tell the user to what email their verification code was sent to 
        router.push(responseData.url);
      }
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  //this function just makes sure the first letter is always in capital 
  const handleInputChange = (e, fieldName) => {
    const value = capitalFirstLetter(e.target.value);
    setValue(fieldName, value, { shouldValidate: true });
  };
  return (
    <div className={styles.container}>
      {/* rendering a reusable LoginForm component since its also used in the checkout page */}
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
              {...register("email", { required: "email" })}
              type="email"
              className={styles.registerInput}
            />
            {errors.email && (
              <p style={{ color: "red", marginTop: -15 }}>
                {errors.email?.message}
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
              onChange={(e) => handleInputChange(e, "address")}
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
              className={styles.registerInput}onChange={(e) => handleInputChange(e, "city")}
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
              className={styles.registerInput}onChange={(e) => handleInputChange(e, "country")}
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
              className={styles.registerInput}onChange={(e) => handleInputChange(e, "firstName")}
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
              className={styles.registerInput}onChange={(e) => handleInputChange(e, "lastName")}
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
              <span className={styles.registerErrorMain}>{registerError}</span>
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

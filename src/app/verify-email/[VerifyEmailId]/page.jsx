"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "../../../styles/verifyEmail.module.css";
import loginStyles from "../../../styles/Login.module.css";
import { NextResponse } from "next/server";

function VerifyEmail({ params, userEmail }) {
  const { VerifyEmailId } = params;
  const [code, setCode] = useState(new Array(6).fill(""));
  const [completedCode, setCompletedCode] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [displayResponseDataError, setDisplayResponseDataError] = useState("");
  const [displayResponseDataSuccess, setDisplayResponseDataSuccess] =
    useState("");

  const inputRefs = useRef([]);

  /////////// HANDLE INPUTS AND AUTOMATICALLY CHANGE TO NEXT INPUT FIELD /////////////
  const handleInputChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    if (newCode.every((number) => number !== "")) {
      setCompletedCode(newCode.join(""));
    }
  };
  useEffect(() => {
    inputRefs.current[0].focus();

    if (completedCode.length === 6) {
      submitVerifyEmail();
      setCode(new Array(6).fill(""));
    }
  }, [completedCode]);
  /////////// HANDLE INPUTS AND AUTOMATICALLY CHANGE TO NEXT INPUT FIELD /////////////

  /////// SUBMIT VERIFICATION CODE //////////////////
  async function submitVerifyEmail() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            VerifyEmailId: VerifyEmailId,
            VerificationCode: code,
          }),
        }
      );
      const responseData = await response.json();

      if (responseData.error) {
        setDisplayResponseDataError(responseData.error);
        setCode(new Array(6).fill(""));
      }
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  /////// SUBMIT VERIFICATION CODE //////////////////

  //////// RESEND EMAIL //////////
  async function resendEmail() {
    setDisableButton(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/resend-verification-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            VerifyEmailId: VerifyEmailId,
          }),
        }
      );
      const responseData = await response.json();
      setDisplayResponseDataError(null);
      setDisplayResponseDataSuccess(responseData.message);
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  //////// RESEND EMAIL //////////
  return (
    <div>
      <form className={styles.form} onSubmit={submitVerifyEmail}>
        <h2>Verify your account</h2>
        <h3>We emailed you a 6-digit number to {userEmail} </h3>
        <h3>Enter the code below to verify you email address </h3>
        <div className={styles.enterCode}>
          {code.map((code, index) => (
            <input
              key={index}
              type="number"
              id={`code-${index}`}
              value={code}
              onChange={(e) => handleInputChange(index, e.target.value)}
              maxLength={1}
              pattern="[0-9]*"
              required
              ref={(ref) => (inputRefs.current[index] = ref)}
              className={styles.inputRemoveArrows}
            />
          ))}
        </div>{" "}
        <p
          style={{
            width: "65%",
            color: displayResponseDataError ? "red" : "#585858",
            paddingBottom: "0.5rem",
            textAlign: "Center",
          }}
        >
          {displayResponseDataError || displayResponseDataSuccess}
        </p>
        {displayResponseDataError && (
          <button
            onClick={resendEmail}
            className={loginStyles.buttonRegister}
            disabled={disableButton}
          >
            Resend
          </button>
        )}
      </form>
    </div>
  );
}

export default VerifyEmail;

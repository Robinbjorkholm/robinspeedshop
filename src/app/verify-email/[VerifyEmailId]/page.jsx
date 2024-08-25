"use client";
import React, { useState, useRef, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import styles from "../../../styles/verifyEmail.module.css";
import loginStyles from "../../../styles/Login.module.css";
import { IconContext } from "react-icons";
import { MdMarkEmailRead } from "react-icons/md";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";

function VerifyEmail({ params, userEmail }) {
  const { VerifyEmailId } = params;
  const [code, setCode] = useState(new Array(6).fill(""));
  const [completedCode, setCompletedCode] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [displayResponseDataError, setDisplayResponseDataError] = useState("");
  const [displayResponseDataSuccess, setDisplayResponseDataSuccess] =
    useState("");
  const [verifiedSuccessfully, setVerifiedSuccessfully] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(5);
  const inputRefs = useRef([]);
  const router = useRouter();

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
    if (!verifiedSuccessfully) {
      inputRefs.current[0].focus();
      if (completedCode.length === 6) {
        submitVerifyEmail();
        setCode(new Array(6).fill(""));
      }
    }
    if (verifiedSuccessfully) {
      const interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [completedCode, verifiedSuccessfully]);

  /////////// HANDLE INPUTS AND AUTOMATICALLY CHANGE TO NEXT INPUT FIELD /////////////

  /////// SUBMIT VERIFICATION CODE //////////////////
  async function submitVerifyEmail() {
    setIsLoading(true);
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
      setIsLoading(false);
      if (
        responseData.error ||
        responseData.message === "You have already verified your account"
      ) {
        setDisplayResponseDataSuccess(responseData.message);

        setDisplayResponseDataError(responseData.error);
        setCode(new Array(6).fill(""));
      }
      if (responseData.message === "Account verified you can now login") {
        setVerifiedSuccessfully(true);
        setTimeout(() => router.push("/"), 5000);
      }
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  /////// SUBMIT VERIFICATION CODE //////////////////

  //////// RESEND EMAIL //////////
  async function resendEmail() {
    setDisableButton(true);
    setIsLoading(true);
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
      setIsLoading(false);
      setDisplayResponseDataError(null);
      setDisplayResponseDataSuccess(responseData.message);
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  //////// RESEND EMAIL //////////

  return (
    <div className={styles.div}>
      {!verifiedSuccessfully ? (
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
          {isLoading && <LoadingSpinner />}
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
      ) : (
        <div className={styles.form}>
          <IconContext.Provider value={{ color: "green", size: "120px" }}>
            <MdMarkEmailRead />
          </IconContext.Provider>
          <h2>Account verified</h2>
          <h3>you can now use your account</h3>
          <h3>
            you will automatically get routed back to the home page in {timer}
            (seconds)
          </h3>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;

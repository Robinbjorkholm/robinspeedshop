"use client";
import React, { useState, useRef, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import styles from "../../../styles/verifyEmail.module.css";
import loginStyles from "../../../styles/login.module.css";
import { IconContext } from "react-icons";
import { MdMarkEmailRead } from "react-icons/md";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import hideEmail from "@/lib/hideEmail";

function VerifyEmail({ params }) {
  const router = useRouter();
  const { token } = params;
  const [code, setCode] = useState(new Array(6).fill(""));
  const [completedCode, setCompletedCode] = useState("");
  const [email, setEmail] = useState(null);
  const [validToken, setValidToken] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const [displayResponseDataError, setDisplayResponseDataError] = useState("");
  const [displayResponseDataSuccess, setDisplayResponseDataSuccess] =
    useState("");
  const [verifiedSuccessfully, setVerifiedSuccessfully] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPage,setIsLoadingPage] = useState(true)
  const [timer, setTimer] = useState(5);
  const inputRefs = useRef([]);

  //verify token
  useEffect(() => {
    verifyToken();
  }, []);

  useEffect(() => {
    if (email) {
      if (!verifiedSuccessfully) {
        inputRefs.current[0].focus();
        if (completedCode.length === 6) {
          submitVerifyEmail();
          setCode(new Array(6).fill(""));
        }
      }  else {
        const interval = setInterval(() => {
          setTimer((timer) => timer - 1);
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [completedCode, verifiedSuccessfully, email]);

  /////////// HANDLE INPUTS AND AUTOMATICALLY CHANGE TO NEXT INPUT FIELD /////////////
  
  
  const handleInputChange = (index, value) => {
    const characterInput = value.slice(0, 1);
    const newCode = [...code];
    newCode[index] = characterInput;
    setCode(newCode);
    if (characterInput !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    if (newCode.every((number) => number !== "")) {
      setCompletedCode(newCode.join(""));
    }
  };

  // gets token from params and sends it to find a user if token is valid it returns true and the users email and if the user is already verified,  otherwise returns false
  async function verifyToken() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/user/verify-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        }
      );
      const data = await response.json();
      setValidToken(data.validToken);
      setEmail(data.email);
      if (!data.email || data.validToken === false) {
        router.push("/");
      }
      setIsLoadingPage(false);
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }

  /////// SUBMIT VERIFICATION CODE //////////////////
  async function submitVerifyEmail() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/user/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            VerificationCode: code,
          }),
        }
      );
      const data = await response.json();
      setIsLoading(false);
      if (
        data.error ||
        data.message === "You have already verified your account"
      ) {
        setDisplayResponseDataSuccess(data.message);
        setDisplayResponseDataError(data.error);
        setCode(new Array(6).fill(""));
      }
      if (data.message === "Account verified you can now login") {
        setVerifiedSuccessfully(true);
        setTimeout(() => router.push("/"), 5000);
      }
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }

  //////// RESEND EMAIL //////////
  async function resendEmail() {
    setDisableButton(true);
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/user/resend-verification-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        }
      );
      const data = await response.json();
      setIsLoading(false);
      setDisplayResponseDataError(null);
      setDisplayResponseDataSuccess(data.message);
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }

  if (isLoadingPage === true) {
    return <div>loading...</div>;
  }

  if (validToken === true) {
    return (
      <div className={styles.div}>
        {!verifiedSuccessfully ? (
          <form className={styles.form} onSubmit={submitVerifyEmail}>
            <h1>Verify your account</h1>
            <br />
            <h3>
              We emailed you a 6-digit number to{" "}
              <span style={{ color: "black" }}>{hideEmail(email)}</span>{" "}
            </h3>
            <h3>Enter the code below to verify you email address </h3>
            <div className={styles.enterCode}>
              {code.map((code, index) => (
                <input
                  key={index}
                  type="number"
                  id={`code-${index}`}
                  value={code}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  pattern="[0-9]*"
                  required
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  className={styles.inputRemoveArrows}
                  maxLength="1"
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
}

export default VerifyEmail;

"use client";
import React, { useState, useRef } from "react";
import styles from "../../../styles/verifyEmail.module.css";
import { NextResponse } from "next/server";

function VerifyEmail({ params }) {
  const { VerifyEmailId } = params;   
  const [code, setCode] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    const newcode = [...code];
    newcode[index] = value;
    setCode(newcode);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
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
            VerificationNumber: code,
          }),
        }
      );
      if (response.message === "Account verified you can now login") {
        return NextResponse.json("Account verified you can now login");
      }
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }

  return (
    <div>
      <form className={styles.form} onSubmit={submitVerifyEmail}>
        <h2>Verify your account</h2>
        <h3>We emailed you a 6-digit number @ email </h3>
        <h3>Enter the code below to verify you email address </h3>
        <div className={styles.enterCode}>
          {code.map((code, index) => (
            <input
              key={index}
              type="tel"
              id={`code-${index}`}
              value={code}
              onChange={(e) => handleInputChange(index, e.target.value)}
              maxLength={1}
              pattern="[0-9]*"
              required
              ref={(ref) => (inputRefs.current[index] = ref)}
            />
          ))}
        </div>{" "}
      </form>
    </div>
  );
}

export default VerifyEmail;
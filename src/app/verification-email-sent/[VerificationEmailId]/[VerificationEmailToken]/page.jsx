"use client";
import React, { useState, useEffect } from "react";
import styles from "../../../../styles/VerificationEmailSent.module.css";
import ValidateTokenApi from "@/app/api/ValidateToken";

function VerificationEmailSent({ params }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await ValidateTokenApi(
          params.VerificationEmailId,
          params.VerificationEmailToken
        );

        if (response === true) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.log(error);
        setIsValid(false);
      }
    };
    validateToken();
  }, [params.VerificationEmailId, params.VerificationEmailToken]);

  if (isValid === null) {
    return <div>Loading...</div>;
  }

  if (!isValid) {
    return (
      <div>
        <div className={styles.test}>
          <h1>invalid url</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.test}>
        <h1>Email Sent</h1>
        <p>
          We've sent a verification link to your email address. Please check
          your inbox and click on the link to verify your email address.
        </p>
        <p>
          If you don't see the email in your inbox, please check your spam
          folder or try resending the verification email.
        </p>
        <button>Resend</button>
      </div>
    </div>
  );
}

export default VerificationEmailSent;

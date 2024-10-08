"use client";
import { useState } from "react";
import styles from "../../../styles/verificationEmailSent.module.css";
import loginStyles from "../../../styles/login.module.css";
import { MdMarkEmailRead } from "react-icons/md";
import LoadingSpinner from "@/app/components/LoadingSpinner";

function VerificationEmailSentClient({ VerificationEmailSentId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState("");
  const [responseSuccess, setResponseSuccess] = useState("");
  async function submitResendVerificationCode() {
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
            VerificationEmailSentId: VerificationEmailSentId,
          }),
        }
      );
      const responseData = await response.json();
      setIsLoading(false);
      if (responseData.error) {
        setResponseError(responseData.error);
      } else if (responseData.message) {
        setResponseSuccess(responseData.message);
      }
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  return (
    <div className={styles.container}>
      <MdMarkEmailRead
        size={120}
        style={{ margin: "0 auto", color: "rgb(0, 222, 0)" }}
      />
      <h2 style={{ marginBottom: "20px" }}>Verification email sent</h2>
      <p>
        We've sent a verification link to your email address. Please check your
        inbox and click on the link to verify your email address.
      </p>
      <p>
        If you don't see the email in your inbox, please check your spam folder
        or try resending the verification email.
      </p>
      {!isLoading ? (
        <button
          onClick={() => submitResendVerificationCode()}
          className={loginStyles.buttonRegister}
        >
          Resend{" "}
        </button>
      ) : (
        <button disabled={true} className={loginStyles.buttonRegister}>
          Sending...{" "}
        </button>
      )}

      {responseSuccess && <p style={{ color: "black" }}>{responseSuccess}</p>}
      {responseError && <p style={{ color: "red" }}>{responseError}</p>}
    </div>
  );
}
export default VerificationEmailSentClient;

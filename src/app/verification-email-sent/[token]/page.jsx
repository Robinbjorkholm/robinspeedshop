"use client";
import { useState, useEffect } from "react";
import styles from "../../../styles/verificationEmailSent.module.css";
import loginStyles from "../../../styles/login.module.css";
import { MdMarkEmailRead } from "react-icons/md";
import hideEmail from "@/lib/hideEmail"
import { useRouter } from "next/navigation";

function VerificationEmailSent({ params }) {
  const {token} = params
  const [isLoading, setIsLoading] = useState(true);
  const [responseError, setResponseError] = useState("");
  const [responseSuccess, setResponseSuccess] = useState("");
  const [validToken, setValidToken] = useState(null);
  const [email, setEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    verifyToken();
  }, []);

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
            token:token,
          }),
        }
      );
      const data = await response.json();
      setValidToken(data.validToken);
  
      setEmail(data.email);
      setIsLoading(false);
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
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
            id: token,
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


  if (validToken === false) {
    router.push("/");
  }

  if (isLoading === true) {
    return <div>loading...</div>;
  }
  if (validToken === true) {
    return (
      <div className={styles.container}>
        <MdMarkEmailRead
          size={120}
          style={{ margin: "0 auto", color: "rgb(0, 222, 0)" }}
        />
        <h2 style={{ marginBottom: "20px" }}>Verification email sent</h2>
        <p>
          We've sent a verification link to your email address{" "}
          <b>{hideEmail(email)}</b>. Please check your inbox and click on the
          link to verify your email address.
        </p>
        <p>
          If you don't see the email in your inbox, please check your spam
          folder or try resending the verification email.
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
}
export default VerificationEmailSent;

"use client";
import { useState, useEffect } from "react";
import styles from "../../../styles/verificationEmailSent.module.css";
import loginStyles from "../../../styles/login.module.css";
import { MdMarkEmailRead } from "react-icons/md";
import hideEmail from "@/lib/hideEmail";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VerificationEmailSent({ params }) {
  const { token } = params;
  const [isLoading, setIsLoading] = useState(true);

  const [userAlreadyVerified, setUserAlreadyVerified] = useState(null);
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
            token: token,
          }),
        }
      );
      const data = await response.json();
      setValidToken(data.validToken);
      setEmail(data.email);
      setUserAlreadyVerified(data.isVerified);
      setIsLoading(false);
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  const notifySuccess = (message) =>
    toast.success(message, {
      autoClose: 5000,
      hideProgressBar: false,
      progress: undefined,
      theme: "light",
    });
  const notifyError = (message) =>
    toast.error(message, {
      autoClose: 5000,
      hideProgressBar: false,
      progress: undefined,
      theme: "light",
    });
  async function resendVerificationCode() {
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
      const responseData = await response.json();
      setIsLoading(false);
      if (responseData.error) {
        console.log(responseData.error);
        notifyError(responseData.error);
      } else if (responseData.message) {
        console.log(responseData.message);
        notifySuccess(responseData.message);
      }
    } catch (error) {
      console.error(error);
    }
  }
  if (validToken === false) {
    router.push("/");
  }
  if (userAlreadyVerified === true) {
    return (
      <div className={styles.container}>
        <MdMarkEmailRead
          size={120}
          style={{ margin: "0 auto", color: "rgb(0, 222, 0)" }}
        />
        <h2 style={{ marginBottom: "20px" }}>You are already verified</h2>

        <p>
          You can log in to your account by going to the Log in page or by{" "}
          <b>
            <Link href="/login">
              <a>clicking here</a>{" "}
            </Link>
          </b>
        </p>
      </div>
    );
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
        </p>{" "}
        {!isLoading ? (
          <button
            onClick={() => resendVerificationCode()}
            className={loginStyles.buttonRegister}
          >
            Resend{" "}
          </button>
        ) : (
          <button disabled={true} className={loginStyles.buttonRegister}>
            Sending...{" "}
          </button>
        )}
        <ToastContainer
          style={{ margin: "0 auto", position: "relative" }}
          position="center"
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
      </div>
    );
  }
}
export default VerificationEmailSent;

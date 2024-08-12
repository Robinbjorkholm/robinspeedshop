import React from "react";
import { NextResponse } from "next/server";

function VerifyEmail({ params }) {
  const { VerifyEmailId, VerifyEmailToken } = params;
  submitVerifyEmail();
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
            VerifyEmailToken: VerifyEmailToken,
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
      VerifyEmailToken id: {params.VerifyEmailId} token:{" "}
      {params.VerifyEmailToken}
    </div>
  );
}

export default VerifyEmail;

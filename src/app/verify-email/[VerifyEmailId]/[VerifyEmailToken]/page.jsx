import React from "react";
import VerifyEmailApi from "@/app/api/VerifyEmailApi";

function VerifyEmail({ params }) {
  VerifyEmailApi(params.VerifyEmailId, params.VerifyEmailToken);

  return (
    <div>
      VerifyEmailToken id: {params.VerifyEmailId} token:{" "}
      {params.VerifyEmailToken}
    </div>
  );
}

export default VerifyEmail;

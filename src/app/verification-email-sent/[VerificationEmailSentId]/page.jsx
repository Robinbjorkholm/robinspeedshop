import { redirect } from "next/navigation";
import { getEmailSentSession } from "../../../lib/session";
import VerificationEmailSentClient from "./client";

export default function VerificationEmailSent({params}) {
  const { VerificationEmailSentId } = params;

  const sessionCookie = getEmailSentSession();

  if (!sessionCookie) {
    redirect("/");
  }

  return <VerificationEmailSentClient VerificationEmailSentId={VerificationEmailSentId}/>;
}

import { cookies } from "next/headers";

export function getEmailSentSession() {
  const cookie = cookies().has("registersession");
  return cookie;
}
export function logout() {
  cookies().delete("authsession");
}

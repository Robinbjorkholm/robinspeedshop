import { cookies } from "next/headers";


export function logout() {
  cookies().delete("authsession");
}

"use client";
import { SessionProvider } from "next-auth/react";

export default function ClientRootLayout({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

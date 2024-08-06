import { NextResponse } from "next/server";

export async function GET(res, res) {
  const response = NextResponse.json({ message: "logged out" });

  response.cookies.delete("x-authToken", { path: "/", httpOnly: true });

  return response;
}

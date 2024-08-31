import bcrypt from "bcryptjs";
import User from "../../../../models/User";
import connectDB from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import logger from "../../../../winston";

export async function POST(req, res) {
  await connectDB();
  const { email, password } = await req.json();
  try {
    if (!email || !password)
      return NextResponse.json({
        error: "Please enter both fields",
      });

    const user = await User.findOne({ email: email });
    if (!user)
      return NextResponse.json({ error: "Incorrect username or password" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return NextResponse.json({ error: "Incorrect username or password" });
    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const token = await new SignJWT({ userId: user._id })
      .setProtectedHeader({
        alg: "HS256",
      })
      .sign(jwtSecret);

    const expireDate = new Date(Date.now() + 604800000);
    cookies().set("authToken", token, {
      httpOnly: true,
      secure: true,
      expires: expireDate,
      sameSite: "lax",
      path: "/",
      maxAge: 604800,
    });
    return NextResponse.json({
      url: `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/`,
    });
  } catch (error) {
    console.error(error);
    logger.error("Error login ", error);
    return NextResponse.json({ message: "error " }, { status: 500 });
  }
}

import bcrypt from "bcryptjs";
import User from "../../../models/User";
import connectDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function POST(req, res) {
  await connectDB();
  const { email, password } = await req.json();

  try {
    if (!email || !password)
      return NextResponse.json({
        message: "no email and/or password provided",
      });
    const user = await User.findOne({ email: email });
    if (!user)
      return NextResponse.json({ message: "Incorrect username or password" });
    const validPassword = await bcrypt.compare(user.password, password);
    if (!validPassword)
      return NextResponse.json({ message: "Incorrect username or password" });
    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const token = await new SignJWT({ userId: user._id })
      .setProtectedHeader({
        alg: "HS256",
      })
      .sign(jwtSecret);

    res.cookies.set({
      name: "authToken",
      value: token,
      path: "/",
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "error " }, { status: 500 });
  }
}

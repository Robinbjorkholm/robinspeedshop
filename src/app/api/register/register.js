import bcrypt from "bcrypt";
import User from "../../../models/User";
import connectDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { SignJWT } from "jose";

export async function POST(request) {
  await connectDB();
  const { email, password, address, country, city, postalCode } =
    await request.json();

  try {
    const user = await User.findOne({ email: email });
    if (user) return NextResponse.json({ Message: "Email already exist" });

    const newUser = new User({
      email: email,
      password: bcrypt.hash(10, password),
      address: address,
      country: country,
      city: city,
      postalCode: postalCode,
      isVerified: false,
      admin: false,
    });
    await newUser.save();
    return NextResponse.json({
      message:
        "Account created, please check your email for verifying your account",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "error " }, { status: 500 });
  }
}

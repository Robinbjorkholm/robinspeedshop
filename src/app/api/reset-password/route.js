import bcrypt from "bcrypt";
import User from "../../../models/User";
import connectDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await connectDB();
  const { email } = await req.json();

  try {
    const user = await User.findOne({ email: email });
    if (!user) return NextResponse.json({ Message: "Email is not registered" });

    const newUser = new User({
      email: createEmail,
      password: hashedPassword,
      address: address,
      country: country,
      city: city,
      postalCode: postalCode,
      isVerified: true,
      admin: false,
    });
    await newUser.save();
    return NextResponse.json({
      message:
        "Account created, please check your email for verifying your account",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

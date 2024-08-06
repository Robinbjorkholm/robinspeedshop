import bcrypt from "bcrypt";
import User from "../../../models/User";
import connectDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await connectDB();
  const { createEmail, createPassword, address, country, city, postalCode } =
    await req.json();

  try {
    const user = await User.findOne({ email: createEmail });
    if (user) return NextResponse.json({ Message: "Email already exist" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createPassword, salt);

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

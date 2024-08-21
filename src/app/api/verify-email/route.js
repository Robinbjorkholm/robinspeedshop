import User from "../../../models/User";
import connectDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await connectDB();
  const { VerifyEmailId, VerificationNumber } = await req.json();
  console.log(VerifyEmailId, VerificationNumber);
  try {
    const user = await User.findOne({ _id: VerifyEmailId });
    if (!user) {
      return NextResponse.json({ Message: "Email is not registered" });
    }
    if (user.verificationCode !== VerificationNumber) {
      return NextResponse.json({
        message:
          "Code you provided is incorrect, please double-check the code sent to your email and try again",
      });
    }
    user.isVerfied = true;
    console.log("user status", user.isVerfied);
    await user.save();
    return NextResponse.json({
      message: "Account verified you can now login",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

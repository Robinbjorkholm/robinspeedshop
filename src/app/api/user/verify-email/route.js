import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import logger from "@/winston";

export async function POST(req, res) {
  await connectDB();

  const { email, VerificationCode } = await req.json();
  const VerificationNumberString = VerificationCode.join("");
  const VerificationNumber = parseInt(VerificationNumberString);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Email is not registered" });
    }
    if (user.verificationCode !== VerificationNumber) {
      return NextResponse.json({
        error:
          "Code you provided is incorrect, please double-check the code sent to your email and try again, if you dont have the code press the button below to resend it.",
      });
    }
    if (user.isVerified === true) {
      return NextResponse.json({
        message: "You have already verified your account",
      });
    }

    user.isVerified = true;
    await user.save();
    return NextResponse.json({
      message: "Account verified you can now login",
    });
  } catch (error) {
    logger.error("Error verify-email", error);
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

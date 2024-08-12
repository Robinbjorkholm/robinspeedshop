import User from "../../../models/User";
import connectDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await connectDB();
  const { VerifyEmailId, VerifyEmailToken } = await req.json();
  try {
    console.log("hello world");
    const user = await User.findOne({ _id: VerifyEmailId });
    if (!user) return NextResponse.json({ Message: "Email is not registered" });

    /*const verificationToken = await user.verifyToken(VerifyEmailToken);
    if (!verificationToken)
      return NextResponse.json({ Message: "Invalid token" });*/

    await User.findOneAndUpdate({ _id: VerifyEmailId }, { isVerified: true });
    return NextResponse.json({
      message: "Account verified you can now login",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

import User from "../../../models/User";
import connectDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await connectDB();
  const { VerifyEmailId } = await req.json();
  try {
    const user = await User.findOne({ _id: VerifyEmailId });
    if (!user) {
      return NextResponse.json({ Message: "Email is not registered" });
    }
    console.log(user.email);
    return user.email;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

import bcrypt from "bcryptjs";
import User from "../../../models/User";
import connectDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await connectDB();
  const { id, password } = await req.json();
  try {
    const user = await User.findOne({ _id: id });
    if (!user)
      return NextResponse.json({
        error: "User doesnt exist ",
      });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    return NextResponse.json({
      message: "Password updated, you can now use your new password to login",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

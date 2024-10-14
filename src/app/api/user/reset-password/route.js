import bcrypt from "bcryptjs";
import User from "../../../../models/User";
import connectDB from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import logger from "../../../../winston";

export async function POST(req, res) {
  await connectDB();
  const { id, password } = await req.json();
  const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  };
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "User doesnt exist" });
  }

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
    logger.error("Error resetting password", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

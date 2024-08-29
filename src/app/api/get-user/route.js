import User from "../../../models/User";
import connectDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await connectDB();
  const { VerifyEmailId } = await req.json();
  const isValidObjectId = (VerifyEmailId) => {
    return /^[0-9a-fA-F]{24}$/.test(VerifyEmailId);
  };
  if (!isValidObjectId(VerifyEmailId)) {
    return NextResponse.json({ error: "User doesnt exist" });
  }

  try {
    const user = await User.findOne({ _id: VerifyEmailId });
    if (!user) {
      return NextResponse.json({ Message: "Email is not registered" });
    }
    return user.email;
  } catch (error) {
    console.error(error);
    logger.error("Error get-user");
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

import User from "../../../../models/User";
import connectDB from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import logger from "../../../../winston";

export async function POST(req) {
  await connectDB();
  const { token } = await req.json();

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return NextResponse.json({ validToken: false });
    }

    return NextResponse.json({
      email: user.email,
      validToken: true,
      isVerified: user.isVerified,
    });
  } catch (error) {
    logger.error("Error verifying token", error);
    return NextResponse.json(
      { validToken: false },
      { error: "Invalid or expired token." },
      { status: 400 }
    );
  }
}

import User from "../../../../models/User";
import connectDB from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import logger from "../../../../winston";
import { jwtVerify } from "jose";

export async function POST(req) {
  await connectDB();
  const { VerificationEmailSentId } = await req.json();
  try {
    const tokenSecret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const { payload } = await jwtVerify(VerificationEmailSentId, tokenSecret);
    const { createEmail } = payload;

  

    const user = await User.findOne({ email: createEmail });

    if (!user) {
      return NextResponse.json({ error: "Invalid token." }, { status: 404 });
    }
    const validToken = true
    return NextResponse.json({createEmail, validToken});
  } catch (error) {
    logger.error("Error verifying token", error);
    return NextResponse.json(
      { error: "Invalid or expired token." },
      { status: 400 }
    );
  }
}

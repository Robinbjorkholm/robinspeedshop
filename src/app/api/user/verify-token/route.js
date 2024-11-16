import User from "../../../../models/User";
import connectDB from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import logger from "../../../../winston";
import { jwtVerify } from "jose";

export async function POST(req) {
  await connectDB();
  const { token } = await req.json();
  
  try {
    const tokenSecret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const { payload } = await jwtVerify(token, tokenSecret, {
      algorithms: ["HS256"],
    });
    const { email } = payload;
   
    const user = await User.findOne({ email: email });
   
    if (!user) {
      return NextResponse.json({ email, validToken: false });
    }

    return NextResponse.json({ email, validToken: true });
  } catch (error) {
    logger.error("Error verifying token", error);
    return NextResponse.json(
      { validToken: false },
      { error: "Invalid or expired token." },
      { status: 400 }
    );
  }
}

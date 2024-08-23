import User from "../../../models/User";
import connectDB from "../../../lib/mongodb";
import { sendEmail } from "../../../utils/nodemailer";

import { NextResponse } from "next/server";

export async function POST(req, res) {
  await connectDB();
  const { VerifyEmailId } = await req.json();

  try {
    const user = await User.findOne({ _id: VerifyEmailId });
    if (!user) {
      return NextResponse.json({ Message: "Email is not registered" });
    }
    try {
      const data = {
        from: "robinspeedshop",
        to: user.email,
        subject: "robinspeedshop - Your verification code",
        html: `<p>Your 6-digit verification code is: <strong>${user.verificationCode}</strong></p>
          `,
      };
      await sendEmail(data);
      return NextResponse.json({
        message:
          "Verification code sent. If you do not see the email in a few minutes, check your “junk mail” folder or “spam” folder.",
      });
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

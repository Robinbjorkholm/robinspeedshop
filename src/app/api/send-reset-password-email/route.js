import User from "../../../models/User";
import connectDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import { sendEmail } from "../../../utils/nodemailer";

export async function POST(req, res) {
  await connectDB();
  const { email } = await req.json();

  try {
    if (!email) return NextResponse.json({ Message: "Please enter a valid email" });
    
    const user = await User.findOne({ email: email });
    if (!user) return NextResponse.json({ Message: "Email is not registered" });
    try {
      const data = {
        from: "robinspeedshop",
        to: user.email,
        subject: "robinspeedshop - Reset password",
        html: `<p>Please follow the instructions below to reset your password </p>
        <p>Click on this link to reset your password: <a href="${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/reset-password/${user._id}">Reset password</a>.</p>
        <p>If this was a mistake you can simply ignore this email.</p>`,
      };
      await sendEmail(data);
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

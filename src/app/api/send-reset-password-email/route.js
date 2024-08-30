import User from "../../../models/User";
import connectDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import { sendEmail } from "../../../utils/nodemailer";

export async function POST(req, res) {
  await connectDB();
  const { email } = await req.json();

  try {
    if (!email)
      return NextResponse.json({ error: "Please enter a valid email" });

    const user = await User.findOne({ email: email });
    if (!user) return NextResponse.json({ error: "Email is not registered" });
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
      return NextResponse.json({
        message:
          "An Email containing a link for resetting your password has been sent to",
        email: user.email,
      });
    } catch (error) {
      console.error(error);
      logger.error("error sending email - send-reset-password-email", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    logger.error("error send-reset-password-email", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

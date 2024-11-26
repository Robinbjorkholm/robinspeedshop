import User from "../../../../models/User";
import connectDB from "../../../../lib/mongodb";
import { sendEmail } from "../../../../utils/nodemailer";
import { NextResponse } from "next/server";
import logger from "../../../../winston";

export async function POST(req, res) {
  await connectDB();
  const { token } = await req.json();

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return NextResponse.json({ error: "Email is not registered." });
    }
    if (user.emailSentCounter >= 3) {
      return NextResponse.json({
        error: "You have already requested multiple emails, try creating a new account to ensure you used the correct email",
      });
    }
    try {
      const data = {
        from: "robinspeedshop",
        to: user.email,
        subject: "robinspeedshop - Your verification code",
        html: `<p>Your 6-digit verification code is: <strong>${user.verificationCode}</strong></p>
        <p>Please enter the 6-digit code provided in this email <b><a href="${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/verify-email/${user.verificationToken}">here</a></b></p>`,
      };
      await sendEmail(data);
      await User.updateOne(
        {
          _id: user._id,
        },
        { $inc: { emailSentCounter: 1 } }
      );
      return NextResponse.json({
        message:
          "Verification email sent. If you do not see the email in a few minutes, check your “junk” or “spam” folder.",
      });
    } catch (error) {
      console.error(error);
      logger.error("Error sending email - resend-verification-code", error);
    }
  } catch (error) {
    console.error(error);
    logger.error("Error resend-verification-code", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

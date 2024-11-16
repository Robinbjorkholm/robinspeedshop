import User from "../../../../models/User";
import connectDB from "../../../../lib/mongodb";
import { sendEmail } from "../../../../utils/nodemailer";
import { NextResponse } from "next/server";
import logger from "../../../../winston";

export async function POST(req, res) {
  await connectDB();
  const { id } = await req.json();
  const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  };
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "User doesnt exist." });
  }

  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return NextResponse.json({ error: "Email is not registered." });
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
      logger.error("Error sending email - resend-verification-code", error);
    }
  } catch (error) {
    console.error(error);
    logger.error("Error resend-verification-code", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

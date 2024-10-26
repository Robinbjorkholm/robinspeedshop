import bcrypt from "bcryptjs";
import User from "../../../../models/User";
import connectDB from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import { sendEmail } from "../../../../utils/nodemailer";
import { cookies } from "next/headers";
import logger from "../../../../winston";

export async function POST(req, res) {
  await connectDB();
  const {
    createEmail,
    createPassword,
    address,
    country,
    city,
    postalCode,
    firstName,
    lastName,
  } = await req.json();

  try {
    const user = await User.findOne({ email: createEmail });
    if (user)
      return NextResponse.json({
        error:
          "Email already in use, if you have forgot your password you can click the link above to reset your password.",
      });
    if (createPassword.length < 9 || createPassword.length > 20) {
      return NextResponse.json({
        error: "Password has to be between 9 and 20 characters .",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createPassword, salt);
    const generatedVerificationCode =
      Math.floor(Math.random() * 900000) + 100000;
    const newUser = new User({
      email: createEmail,
      password: hashedPassword,
      address: address,
      country: country,
      city: city,
      postalCode: postalCode,
      isVerified: false,
      admin: false,
      verificationCode: generatedVerificationCode,
      firstName: firstName,
      lastName: lastName,
    });

    const expireDate = new Date(Date.now() + 10 * 60 * 1000);
    cookies().set("registersession", process.env.I_NEED_TO_PUT_SOMETHING_HERE, {
      httpOnly: true,
      secure: true,
      expires: expireDate,
      sameSite: "lax",
      path: "/",
    });
    try {
      const data = {
        from: "robinspeedshop",
        to: newUser.email,
        subject: "robinspeedshop - Verify your account",
        html: `<p>Your 6-digit verification code is: <strong>${newUser.verificationCode}</strong></p>
        <p>Please enter the 6-digit code provided in this email <a href="${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/verify-email/${newUser._id}">here</a></p>`,
      };
      await sendEmail(data);
      await newUser.save();

      return NextResponse.json({
        url: `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/verification-email-sent/${newUser._id}`,
      });
    } catch (error) {
      console.error(error);
      logger.error("Error sending email - register", error);
      return NextResponse.json({
        error: "An error occured when creating account",
      });
    }
  } catch (error) {
    console.error(error);
    logger.error("Error register", error);
    return NextResponse.json(
      { message: "Error communicating with server" },
      { status: 500 }
    );
  }
}

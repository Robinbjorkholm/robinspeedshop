import bcrypt from "bcryptjs";
import User from "../../../models/User";
import connectDB from "../../../lib/mongodb";
const { URL } = require("url");
import { NextResponse } from "next/server";
import { sendEmail } from "../../../utils/nodemailer";
import { cookies } from "next/headers";

export async function POST(req, res) {
  await connectDB();
  const { createEmail, createPassword, address, country, city, postalCode } =
    await req.json();

  try {
    const user = await User.findOne({ email: createEmail });
    if (user)
      return NextResponse.json({
        error:
          "User with given email already exists,if you have forgot your password you can click the link above to reset your password",
      });
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
    });
    await newUser.save();

    try {
      const data = {
        from: "robinspeedshop",
        to: newUser.email,
        subject: "robinspeedshop - Verify your account",
        html: `<p>Your 6-digit verification code is: <strong>${newUser.verificationCode}</strong></p>
        <p>Please enter the 6-digit code provided in this email <a href="${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/verify-email/${newUser._id}">here</a></p>`,
      };
      await sendEmail(data);
    } catch (error) {
      console.error(error);
    }
    const expire = 10 * 60
    cookies().set("registersession", process.env.I_NEED_TO_PUT_SOMETHING_HERE, {
      httpOnly: true,
      secure: true,
      expires: expire,
      sameSite: "lax",
      path: "/",
    });
  
    return NextResponse.json({
      url: `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/verification-email-sent/${user._id}`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

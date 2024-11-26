import bcrypt from "bcryptjs";
import User from "../../../../models/User";
import connectDB from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import { sendEmail } from "../../../../utils/nodemailer";
import logger from "../../../../winston";
import crypto from "crypto";
import capitalFirstLetter from "@/lib/capitalFirstLetter";

export async function POST(req, res) {
  await connectDB();
  const {
    email,
    createPassword,
    address,
    country,
    city,
    postalCode,
    firstName,
    lastName,
  } = await req.json();

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      if (existingUser.isVerified === true) {
        return NextResponse.json({
          error:
            'Email already in use, if you have forgot your password you can click "forgot password" above to reset your password.',
        });
      } else {
        await User.findByIdAndDelete(existingUser._id);
      }
    }

    if (createPassword.length < 9 || createPassword.length > 20) {
      return NextResponse.json({
        error: "Password has to be between 9 and 20 characters .",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createPassword, salt);

    const generatedVerificationToken = crypto.randomBytes(32).toString("hex");

    const generatedVerificationCode =
      Math.floor(Math.random() * 900000) + 100000;
    const newUser = new User({
      email: email,
      password: hashedPassword,
      address: capitalFirstLetter(address),
      country: capitalFirstLetter(country),
      city: capitalFirstLetter(city),
      postalCode: postalCode,
      isVerified: false,
      admin: false,
      verificationToken: generatedVerificationToken,
      verificationCode: generatedVerificationCode,
      firstName: capitalFirstLetter(firstName),
      lastName: capitalFirstLetter(lastName),
      emailSentCounter: 1,
    });

    const expireDate = new Date(Date.now() + 10 * 60 * 10000);
    try {
      const data = {
        from: "robinspeedshop",
        to: newUser.email,
        subject: "robinspeedshop - Verify your account",
        html: `<p>Your 6-digit verification code is: <strong>${newUser.verificationCode}</strong></p>
        <p>Please enter the 6-digit code provided in this email <b><a href="${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/verify-email/${newUser.verificationToken}">here</a></b></p>`,
      };
      await newUser.save();
      await sendEmail(data);

      return NextResponse.json({
        url: `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/verification-email-sent/${generatedVerificationToken}`,
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

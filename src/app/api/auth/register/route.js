import bcrypt from "bcryptjs";
import User from "../../../../models/User";
import connectDB from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import { sendEmail } from "../../../../utils/nodemailer";
import logger from "../../../../winston";
import { SignJWT } from "jose";

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
    const user = await User.findOne({ email: email });
    if (user) {
      if (user.isVerified === true) {
        return NextResponse.json({
          error:
            "Email already in use, if you have forgot your password you can click the link above to reset your password.",
        });
      } else {
     await User.findByIdAndDelete(user._id);
      
      }
    }

    if (createPassword.length < 9 || createPassword.length > 20) {
      return NextResponse.json({
        error: "Password has to be between 9 and 20 characters .",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createPassword, salt);

    const tokenSecret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const verificationToken = await new SignJWT({ email })
      .setProtectedHeader({ alg: "HS256" })
      //.setExpirationTime("1h")
      .sign(tokenSecret);

    const generatedVerificationCode =
      Math.floor(Math.random() * 900000) + 100000;
    const newUser = new User({
      email: email,
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

    const expireDate = new Date(Date.now() + 10 * 60 * 10000);
    try {
      const data = {
        from: "robinspeedshop",
        to: newUser.email,
        subject: "robinspeedshop - Verify your account",
        html: `<p>Your 6-digit verification code is: <strong>${newUser.verificationCode}</strong></p>
        <p>Please enter the 6-digit code provided in this email <a href="${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/verify-email/${verificationToken}">here</a></p>`,
      };
      await newUser.save();
      await sendEmail(data);

      return NextResponse.json({
        url: `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/verification-email-sent/${verificationToken}`,
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

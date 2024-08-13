import bcrypt from "bcryptjs";
import User from "../../../models/User";
import VerificationToken from "../../../models/VerificationToken";
import connectDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import { sendEmail } from "../../../utils/nodemailer";

export async function POST(req, res) {
  await connectDB();
  const { createEmail, createPassword, address, country, city, postalCode } =
    await req.json();

  try {
    const user = await User.findOne({ email: createEmail });
    if (user) return NextResponse.json({ Message: "Email already exist" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createPassword, salt);

    const newUser = new User({
      email: createEmail,
      password: hashedPassword,
      address: address,
      country: country,
      city: city,
      postalCode: postalCode,
      isVerified: false,
      admin: false,
    });
    const verificationToken = await User.generateVerificationToken();
    const tokenString = verificationToken.token;
    newUser.verificationTokenString = tokenString;
    await newUser.save();

    verificationToken.userId = newUser._id;
    await verificationToken.save();

    if (verificationToken) {
      try {
        const data = {
          from: "robinspeedshop",
          to: newUser.email,
          subject: "robinspeedshop - Verify your email address",
          html: `<p>Please verify your email address by clicking this  <a href="${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/verify-email/${newUser._id}/${verificationToken.token}">link</a></p>`,
        };
        await sendEmail(data);
      } catch (error) {
        console.error(error);
      }
    }
    return NextResponse.json({
      message:
        "Account created, please check your email for verifying your account",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

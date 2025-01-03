import connectDB from "../../../../lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import Counter from "@/models/Counter";
import { NextResponse } from "next/server";
import logger from "../../../../winston";

async function getNextOrderNumber() {
  try {
    const counter = await Counter.findOneAndUpdate(
      { id: "orderNumber" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return counter.seq;
  } catch (error) {
    console.error("Error getNextOrderNumber@create-order:", error);
    return NextResponse.json(
      { error: "An error ocurred when creating your order." },
      { status: 500 }
    );
  }
}

export async function POST(req, res) {
  await connectDB();
  const {
    shippingOption,
    address,
    city,
    country,
    guestEmail,
    firstName,
    lastName,
    paymentOption,
    cartProducts,
    email,
  } = await req.json();

  try {
    let newOrder;
    const user = await User.findOne({ email: guestEmail });
    if (user) {
      return NextResponse.json({
        error:
          "Email already in use, use the login button to login to your existing account.",
      });
    }
    const nextOrderNumber = await getNextOrderNumber();
    if (email) {
      const existingUser = await User.findOne({ email });
      newOrder = await Order.create({
        shippingOption,
        paymentOption,
        user: existingUser,
        orderNumber: nextOrderNumber,
      });
    } else if (guestEmail) {
      newOrder = await Order.create({
        cartProducts,
        shippingOption,
        paymentOption,
        orderNumber: nextOrderNumber,
        guestInfo: {
          email: guestEmail,
          firstName,
          lastName,
          country,
          city,
          address,
        },
      });
    }

    return NextResponse.json({
      url: `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/order-placed/${newOrder.orderNumber}`,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    logger.error("Error creating order", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

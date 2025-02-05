import connectDB from "../../../../lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import Counter from "@/models/Counter";
import { NextResponse } from "next/server";
import logger from "../../../../winston";
import { v4 as uuidv4 } from "uuid";

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
    phoneNumber
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
    const newCartProducts = cartProducts.map((product) => ({
      productId: product._id,
      quantity: product.quantity,
      price: product.price,
    }));

    const totalProductPrice = newCartProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    const orderTotalPrice = totalProductPrice + shippingOption.price;

    if (email) {
      const existingUser = await User.findOne({ email });
      newOrder = await Order.create({
        shippingOption,
        paymentOption,
        cartProducts: newCartProducts,
        user: existingUser,
        orderNumber: nextOrderNumber,
        orderUUID: uuidv4(),
        price: orderTotalPrice.toFixed(2),
      });
    } else if (guestEmail) {
      newOrder = await Order.create({
        cartProducts: newCartProducts,
        shippingOption,
        paymentOption,
        orderNumber: nextOrderNumber,
        orderUUID: uuidv4(),
        guestInfo: {
          email: guestEmail,
          firstName,
          lastName,
          country,
          city,
          address,
          phoneNumber,
        },
        price: orderTotalPrice.toFixed(2),
      });
    }

    return NextResponse.json({
      url: `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/order-placed/${newOrder.orderUUID}`,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    logger.error("Error creating order", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

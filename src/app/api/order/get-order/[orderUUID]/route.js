import connectDB from "../../../../../lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import logger from "../../../../../winston";

export async function GET(req, { params }) {
  await connectDB();
  const { orderUUID } = params;
  try {
    const order = await Order.findOne({ orderUUID }).populate(
      "user",
      "email address postalCode city country firstName lastName"
    );
    if (!order) {
      return NextResponse.json({
        url: `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}`,
      });
    }
    return NextResponse.json({
      order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    logger.error("Error fetching order", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

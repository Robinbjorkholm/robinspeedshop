import Products from "../../../models/Products";
import { NextResponse } from "next/server";
import logger from "../../../winston";
import connectDB from "../../../lib/mongodb";

export async function GET() {
  await connectDB();

  try {
    const latestProducts = await Products.find()
      .sort({ createdAt: -1 })
      .limit(5);

    return NextResponse.json(latestProducts);
  } catch (error) {
    console.error(error);
    logger.error("error getting latest products", error);

    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}

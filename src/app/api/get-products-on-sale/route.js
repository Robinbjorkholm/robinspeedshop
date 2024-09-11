import Products from "../../../models/Products";
import { NextResponse } from "next/server";
import logger from "../../../winston";
import connectDB from "../../../lib/mongodb";

export async function GET() {
  await connectDB();
  try {
    const productsOnSale = await Products.find({ isOnSale: true });

    return NextResponse.json(productsOnSale);
  } catch (error) {
    console.error(error);
    logger.error("error getting products on sale", error);

    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}

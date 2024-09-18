import Products from "../../../../models/Products";
import { NextResponse } from "next/server";
import logger from "../../../../winston";
import connectDB from "../../../../lib/mongodb";

export async function GET() {
  await connectDB();
  try {
    const mostPopularProducts = await Products.find()
      .sort({ amountOfPurchases: -1 })
      .limit(5);

    return NextResponse.json(mostPopularProducts);
  } catch (error) {
    console.error(error);
    logger.error("error getting most popular products", error);

    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}

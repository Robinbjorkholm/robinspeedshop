import Products from "../../../../../models/Products";
import { NextResponse } from "next/server";
import logger from "../../../../../winston";
import connectDB from "../../../../../lib/mongodb";

export async function GET(req, { params }) {
  await connectDB();
  const { category } = params;
  try {
    const product = await Products.find({ category: category });
    if (!product) {
      return NextResponse.json(
        { error: "Products not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    logger.error("error getting products", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import Products from "../../../../models/Products";
import { NextResponse } from "next/server";
import logger from "../../../../winston";
import connectDB from "../../../../lib/mongodb";

export async function GET(req, { params }) {
  await connectDB();
  const { productId } = params;
  try {
    const product = await Products.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const relatedProducts = await Products.find({
      _id: { $in: product.relatedProducts },
    });
    const responseData = {
      product: product,
      relatedProducts: relatedProducts,
    };
    return NextResponse.json(responseData);
  } catch (error) {
    console.error(error);
    logger.error("error getting single product", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

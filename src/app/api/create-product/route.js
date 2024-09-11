import connectDB from "../../../lib/mongodb";
import Products from "../../../models/Products";
import { NextResponse } from "next/server";
import logger from "../../../winston";

export async function POST(req, res) {
  await connectDB();
  const {
    title,
    titleNews,
    description,
    disclaimers,
    price,
    numberInStock,
    category,
    image,
    stockProduct,
  } = await req.json();
  try {
    const newProduct = await Products.create({
      title: title,
      titleNews: titleNews,
      description: description,
      descriptionDisclaimers: disclaimers,
      price: price,
      numberInStock: numberInStock,
      category: category,
      image: image,
      stockProduct: stockProduct,
    });
    await newProduct.save();
    return NextResponse.json({
      message: "Product created successfully",
    });
  } catch (error) {
    console.error(error);
    logger.error("error creating product", error);
    return NextResponse.json({
      error: "error creating product check log for further information",
    });
  }
}

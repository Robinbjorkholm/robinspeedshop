import connectDB from "../../../../lib/mongodb";
import Products from "../../../../models/Products";
import { NextResponse } from "next/server";
import logger from "../../../../winston";
import crypto from "crypto";

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
    kitIncludes,
  } = await req.json();

  const articleNumber = (
    category.slice(0, 2) +
    "-" +
    crypto.randomBytes(3).toString("hex") +
    Date.now().toString(36)
  ).toUpperCase();

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
      kitIncludes: kitIncludes,
      articleNumber: articleNumber,
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
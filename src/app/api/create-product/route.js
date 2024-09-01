import connectDB from "../../../lib/mongodb";
import Products from "../../../models/Products";
import { NextResponse } from "next/server";
import logger from "../../../winston";

export async function POST(req, res) {
  await connectDB();
  const { title, description, price, numberInStock, category, image } =
    await req.json();
  try {
    const newProduct = await Products.create({
      title: title,
      description: description,
      price: price,
      numberInStock: numberInStock,
      category: category,
      image: image,
    });
    await newProduct.save();
    return NextResponse.json({
      message: "Product created successfully",
    });
    
  } catch (error) {
    console.error(error)
    logger.error("error creating product", error)
  }
}

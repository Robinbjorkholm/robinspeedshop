"use client";
import React, { useState, useEffect } from "react";
import DisplayProductsCards from "@/app/components/DisplayProductsCards";

function Drivetrain() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/products/get-products-by-category/drivetrain`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      setProducts(responseData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <DisplayProductsCards />
    </div>
  );
}

export default Drivetrain;

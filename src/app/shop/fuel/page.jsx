"use client";
import React, { useEffect, useState } from "react";
import DisplayProductsCards from "@/app/components/DisplayProductsCards";

function Fuel() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/products/get-products-by-category/fuel`,
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
    <>
      {" "}
      <DisplayProductsCards products={products} />
    </>
  );
}

export default Fuel;

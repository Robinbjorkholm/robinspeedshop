"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/productCards.module.css";
import NextImage from "next/image";
import { ProductsSkeleton } from "../../../ui/skeletons";

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
    <div>
      {products ? (
        <div className={styles.gridContainer}>
          {products.map((product) => {
            return (
              <div key={product._id} className={styles.gridItem}>
                <div className={styles.imageWrapper}>
                  {" "}
                  <NextImage
                    src={product.image[0]}
                    fill
                    style={{ objectFit: "contain" }}
                    quality={100}
                  />{" "}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <ProductsSkeleton />
      )}
    </div>
  );
}

export default Fuel;

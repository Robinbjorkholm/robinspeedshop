"use client";
import React, { useState, useEffect } from "react";
import { ProductsDetailSkeleton } from "../../../../ui/skeletons";
import styles from "@/styles/productsDetail.module.css";
import { useParams } from "next/navigation";
import calculateDiscountedPrice from "@/lib/calculateDiscountedPrice";
import NextImage from "next/image";

function EngineProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [stockAmount, setStockAmount] = useState("");
  useEffect(() => {
    getProduct();
  }, []);
  useEffect(() => {
    if (product) calculateStockAmount(product);
  }, [product]);

  async function getProduct() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/products/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      setProduct(responseData);
    } catch (error) {
      console.log(error);
    }
  }
  const getStockColor = (stockAmount) => {
    switch (stockAmount) {
      case "good":
        return "green";
      case "low":
        return "yellow";
      case "none":
        return "red";
      default:
        return "green";
    }
  };

  const calculateStockAmount = (product) => {
    if (product.isStockProduct === false) {
      return;
    }
    if (product.numberInStock > 5) {
      setStockAmount("good");
    } else if (product.numberInStock <= 5) {
      setStockAmount("low");
    } else if (product.numberInStock === 0) {
      setStockAmount("none");
    }
  };
  const stockColor = getStockColor(stockAmount);
  return (
    <>
      {product ? (
        <div className={styles.productDetailsContainer}>
          <div className={styles.productDetailsLeftSide}>
            <div className={styles.imageWrapper}>
              <NextImage
                src={product.image[0]}
                alt={`Image of ${product.title}`}
                fill
                style={{
                  objectFit: "contain",
                }}
                quality={100}
              />
            </div>
          </div>{" "}
          <div className={styles.productDetailsRightSide}>
            <h1 style={{ width: "90%" }}>{product.title}</h1>
            <hr style={{ width: "90%" }} />
            <p style={{ width: "90%", lineHeight: "1.5rem" }}>
              {product.description}
            </p>
            <hr style={{ width: "90%" }} />
            <p style={{fontWeight:"bold", fontSize:"1.5rem"}}>Kit includes:</p>
            {product.kitIncludes.map((product) => (
              <li key={product}>{product}</li>
            ))}
            <p style={{fontWeight:"bold"}}>*{product.descriptionDisclaimers}*</p>
            {product.isStockProduct && (
              <p style={{ fontWeight: "bold" }}>
                <span style={{ color: stockColor }}>
                  {product.numberInStock}
                </span>{" "}
                In stock
              </p>
            )}
            {product.isOnSale ? (
              <p
                style={{
                  fontSize: "2rem",
                }}
              >
                {product.price}€
              </p>
            ) : (
              <div>
                {" "}
                <div className={styles.discountAmount}>
                  <p
                    className={styles.titleImageText}
                    style={{ fontSize: "1rem" }}
                  >
                    -{product.saleDiscount}%
                  </p>
                </div>
                <p
                  style={{
                    textDecoration: "line-through",
                    textDecorationColor: "black",
                    opacity: "0.6",
                  }}
                >
                  {product.price}€
                </p>
                <p
                  style={{
                    fontSize: "2rem",
                    color: "Red",
                  }}
                >
                  {calculateDiscountedPrice(product)}€
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <ProductsDetailSkeleton />
      )}
    </>
  );
}

export default EngineProductDetails;

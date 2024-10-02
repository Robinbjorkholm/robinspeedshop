"use client";
import React, { useState, useEffect } from "react";
import { ProductsDetailSkeleton } from "@/ui/skeletons";
import styles from "@/styles/productsDetail.module.css";
import { useParams } from "next/navigation";
import calculateDiscountedPrice from "@/lib/calculateDiscountedPrice";
import NextImage from "next/image";
import RelatedProducts from "./RelatedProducts";
import useStockAmount from "@/lib/hooks/useStockAmount";

function EngineProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const stockAmount = useStockAmount(product);
  useEffect(() => {
    getProduct();
  }, []);

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

      setProduct(responseData.product);
      setRelatedProducts(responseData.relatedProducts);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {product ? (
        <div styles={{ display: "flex", flexDirection: "column" }}>
          <div className={styles.productDetailsContainer}>
            <div className={styles.productDetailsLeftSide}>
              <div className={styles.imageContainer}>
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
              <h2>Kit includes:</h2>
              {product.kitIncludes.map((product) => (
                <li key={product}>{product}</li>
              ))}
              <p style={{ fontWeight: "bold" }}>
                *{product.descriptionDisclaimers}*
              </p>
              {product.isStockProduct && (
                <p style={{ fontWeight: "bold" }}>
                  <span style={{ color: stockAmount }}>
                    {product.numberInStock}
                  </span>{" "}
                  In stock
                </p>
              )}
              {!product.isOnSale ? (
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
              <div className={styles.addToCartContainer}>
                <input placeholder="1" type="number"></input>
                <button>Add to cart</button>
              </div>
              <p>
                art Number: <b>{product.articleNumber}</b>
              </p>
            </div>
          </div>

          {relatedProducts && (
            <RelatedProducts relatedProducts={relatedProducts} />
          )}
        </div>
      ) : (
        <ProductsDetailSkeleton />
      )}
    </>
  );
}

export default EngineProductDetails;

"use client";
import React from "react";
import { useRouter } from "next/navigation";

import NextImage from "next/image";
import styles from "@/styles/homePageProducts.module.css"
import comingsoon from "@/images/comingsoon.png";

function ProductNews({ products }) {
  const router = useRouter();

  return (
    <div className={styles.productsMain}>
      <h1>News</h1>
      <div className={styles.productsItemsContainer}>
        {products.map((product) => (
          <div
            key={product._id}
            className={styles.productsItems}
            onClick={() =>
              router.push(
                `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/shop/${product.category}/${product._id}`
              )
            }
          >
            <div >
              <NextImage
                src={product.image[0]}
                className={styles.image}
                alt="coming soon"
                fill
                sizes="(max-width: 100%)"
                style={{
                  objectFit: "contain",
                }}
                quality={100}
              />
              <div className={styles.textContainer}>
                <p className={styles.titleImageText}>{product.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductNews;

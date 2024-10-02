"use client";
import React, { useState } from "react";
import styles from "../../styles/productsRelated.module.css";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import useStockAmount from "@/lib/hooks/useStockAmount";

function RelatedProducts({ relatedProducts }) {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  return (
    <>
      <h1 style={{ paddingTop: "1rem" }}>Related products</h1>
      <div className={styles.productsRelated}>
        {relatedProducts.map((product) => {
          return (
            <div className={styles.productsRelatedContainer}>
              {openModal && <imageModal productImage={product.image[0]} />}
              <div className={styles.imageContainer} key={product._id}>
                <NextImage
                  src={product.image[0]}
                  alt={`Related product: ${product.title}`}
                  fill
                  className={styles.Image}
                  onClick={() => setOpenModal(true)}
                />
              </div>

              <p className={styles.productTitle}>{product.titleNews}</p>

              <p
                className={styles.productNumberInStock}
                style={{ color: useStockAmount(product) }}
              >
                {product.numberInStock} &nbsp;
                <span style={{ color: "black" }}>In stock</span>
              </p>
              <div className={styles.buttonsContainer}>
                <button
                  className={styles.button}
                  onClick={() =>
                    router.push(
                      `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/shop/${product.category}/${product._id}`
                    )
                  }
                >
                  More info{" "}
                </button>
                <button
                  className={styles.buttonBuyNow}
                 
                >
                  Buy now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default RelatedProducts;

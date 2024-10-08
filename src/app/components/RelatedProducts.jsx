"use client";
import React, { useState } from "react";
import styles from "../../styles/productsRelated.module.css";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import useStockAmount from "@/lib/hooks/useStockAmount";
import { useCart } from "@/contexts/CartContext";

function RelatedProducts({ relatedProducts }) {
  const [openModal, setOpenModal] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  return (
    <>
      <h1 style={{ paddingTop: "1rem" }}>Related products</h1>
      <div className={styles.productsRelated}>
        {relatedProducts.map((product) => {
          return (
            <div className={styles.productsRelatedContainer} key={product._id}>
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
                  className={styles.buttonMoreInfo}
                  onClick={() =>
                    router.push(
                      `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/shop/${product.category}/${product._id}`
                    )
                  }
                >
                  More info{" "}
                </button>
                <button
                  className={styles.buttonAddToCart}
                  onClick={() => addToCart(product)}
                >
                  Add to cart
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

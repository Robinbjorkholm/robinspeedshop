"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import styles from "@/styles/homePageProducts.module.css";
import NextImage from "next/image";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import calculateDiscountedPrice from "../../../lib/calculateDiscountedPrice";

function ProductsOnSale({ products }) {
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const productsPerPage = 5;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((previousPage) =>
      previousPage > 0 ? previousPage - 1 : totalPages - 1
    );
  };
  const handleNextPage = () => {
    setCurrentPage((previousPage) =>
      previousPage < totalPages - 1 ? previousPage + 1 : 0
    );
  };
  const displayedProducts = useMemo(() => {
    const startIndex = currentPage * productsPerPage;
    const endIndex = (currentPage + 1) * productsPerPage;
    let displayedProducts = products.slice(startIndex, endIndex);

    if (currentPage === totalPages - 1 && displayedProducts.length === 1) {
      const previousPageProducts = products.slice(startIndex - 4, startIndex);
      displayedProducts = [...previousPageProducts, ...displayedProducts];
    }

    return displayedProducts;
  }, [currentPage, products, totalPages]);

  return (
    <div className={styles.productsMainArrows}>
      {products.length >= 5 && (
        <FaArrowAltCircleLeft
          size={24}
          onClick={handlePreviousPage}
          className={styles.handlePreviousPage}
        />
      )}

      <div className={styles.productsMain}>
        <h1>On sale</h1>

        <div className={styles.productsItemsContainer}>
          {displayedProducts.map((product) => {
            return (
              <div
                key={product._id}
                className={styles.productsItems}
                onClick={() =>
                  router.push(
                    `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/shop/${product.category}/${product._id}`
                  )
                }
              >
                <div className={styles.imageContainer}>
                  <NextImage
                    src={product.image[0]}
                    alt={`Image of ${product.title}`}
                    fill
                    sizes="(max-width: 100%)"
                    style={{
                      objectFit: "contain",
                    }}
                    quality={100}
                  />
                  <div className={styles.discountAmount}>
                    <p
                      className={styles.titleImageText}
                      style={{ fontSize: "1rem" }}
                    >
                      -{product.saleDiscount}%
                    </p>
                  </div>

                  <div className={styles.textContainer}>
                    <p
                      className={styles.titleImageText}
                      style={{
                        textDecoration: "line-through",
                        textDecorationColor: "black",
                        opacity: "0.6",
                      }}
                    >
                      {product.price}€
                    </p>
                    &nbsp; &nbsp;
                    <p className={styles.titleImageText}>
                      {calculateDiscountedPrice(product)}€
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {products.length >= 5 && (
        <FaArrowAltCircleRight
          size={24}
          onClick={handleNextPage}
          className={styles.handleNextPage}
        />
      )}
    </div>
  );
}

export default ProductsOnSale;

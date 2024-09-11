"use client";
import React, { useState,useMemo } from "react";
import styles from "../../styles/homePageProducts.module.css";
import NextImage from "next/image";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

function ProductsOnSale({ products }) {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 5;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((previousPage) => (previousPage > 0 ? previousPage - 1 : totalPages - 1));
  };
  const handleNextPage = () => {
    setCurrentPage((previousPage) => (previousPage < totalPages - 1 ? previousPage + 1 : 0));
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

  const calculateNewPrice = (product) => {
    const discount = (100 - product.saleDiscount) / 100;
    const price = product.price * discount;
    return Number(price.toFixed(2));
  };

  return (
    <div className={styles.productsMain}>
      <FaArrowAltCircleLeft size={24} onClick={handleNextPage} />
      <h1>On sale</h1>
      <div className={styles.productsItemsContainer}>
        {displayedProducts.map((product) => (
          <div key={product._id} className={styles.productsItems}>
            <div className={styles.imageContainer}>
              <NextImage
                src={product.image[0]}
                className={styles.image}
                alt="latest products"
                fill
                sizes="(max-width: 100%)"
                style={{
                  objectFit: "cover",
                }}
                quality={100}
              />
              <div className={styles.discountAmount}>
                <p
                  className={styles.titleImageText}
                  style={{ fontSize: "1rem" }}
                >
                  {" "}
                  -{product.saleDiscount}%
                </p>
              </div>
              <div className={styles.textContainerDiscounted}>
                <div className={styles.testing} />
                <p className={styles.titleImageText}>{product.price}</p>
              </div>
              <div className={styles.textContainer}>
                {" "}
                <p className={styles.titleImageText} style={{ color: "red" }}>
                  {" "}
                  {calculateNewPrice(product)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <FaArrowAltCircleRight size={24} onClick={handlePreviousPage} />
    </div>
  );
}

export default ProductsOnSale;

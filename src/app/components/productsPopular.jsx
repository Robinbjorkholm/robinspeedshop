import React from "react";
import styles from "../../styles/homePageProducts.module.css";
import NextImage from "next/image";

function ProductsOnSale({ products }) {
  return (
    <div className={styles.productsMain}>
      <h1>Popular</h1>
      <div className={styles.productsItemsContainer}>
        {products.map((product) => (
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

export default ProductsOnSale;

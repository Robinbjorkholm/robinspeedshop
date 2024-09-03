import React from "react";
import styles from "../../styles/news.module.css";
import NextImage from "next/image";

function ProductNews({ products }) {
  return (
    <div className={styles.productsNewsMain}>
      <h1>News</h1>
      <div className={styles.productsNewsItems}>
        {products.map((product) => (
          <div key={product._id}>
            <NextImage
              className={styles.newsImage}
              src={product.image[0]}
              alt="latest products"
              layout="fill"
              objectFit="cover"
              quality={100}
            />{" "}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductNews;

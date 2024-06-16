import React from "react";
import styles from "../../styles/card.module.css";
import Image from "next/image";

function Card() {
  return (
    <div className={styles.card}>
      <img src="/turbo.jpg" alt="Product Image" className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>Product Title</h2>
        <p className={styles.cardDescription}>Product description</p>
        <p className={styles.cardPrice}>$19.99</p>
        <button className={styles.cardButton}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Card;

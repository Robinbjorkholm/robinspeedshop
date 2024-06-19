import React from "react";
import styles from "../../styles/card.module.css";
import Image from "next/image";

function Card({ title, price, description }) {
  return (
    <div className={styles.card}>
      <img src="/turbo.jpg" alt="Product Image" className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardDescription}>{description}</p>
        <p className={styles.cardPrice}>{price}</p>
        <button className={styles.cardButton}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Card;

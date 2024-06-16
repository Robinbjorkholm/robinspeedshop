import React from "react";
import styles from "../../styles/productcards.module.css";
import Card from "../components/Card";

function ProductCards() {
  return (
    <div className={styles.gridContainer}>
      {" "}
      <div className={styles.gridItem}>
        <Card />
      </div>
      <div className={styles.gridItem}>
        {" "}
        <Card />
      </div>
      <div className={styles.gridItem}>
        {" "}
        <Card />
      </div>
      <div className={styles.gridItem}>
        {" "}
        <Card />
      </div>
      <div className={styles.gridItem}>
        {" "}
        <Card />
      </div>
      <div className={styles.gridItem}>
        {" "}
        <Card />
      </div>
      <div className={styles.gridItem}>
        {" "}
        <Card />
      </div>
      <div className={styles.gridItem}>
        {" "}
        <Card />
      </div>
    </div>
  );
}

export default ProductCards;

import React from "react";
import styles from "../../styles/productcards.module.css";
import Link from "next/link";
import testdata from "../testdata";
import Card from "../components/Card";

function ProductCards() {
  return (
    <div className={styles.gridContainer}>
      {testdata.map((item) => {
        return (
          <Link className={styles.gridItem} href="/Shop/Fuel/Product1">
            <Card
              key={item.id}
              title={item.title}
              description={item.description}
              price={item.price}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default ProductCards;

import React from "react";
import styles from "../../../styles/productCards.module.css";
import Link from "next/link";
import testdata from "../../testdata";
import Card from "../../components/Card";

function Fuel() {
  return (
    <div className={styles.gridContainer}>
      {testdata.map((item) => {
        return (
          <Link
            className={styles.gridItem}
            href={`/fuel/${item.id}`}
            key={item.id}
          >
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

export default Fuel;

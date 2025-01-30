import React from 'react';
import styles from "@/styles/checkoutSeparator.module.css";

function CheckoutSeparator({ stepNumber, label }) {
  return (
    <div className={styles.checkoutSeparatorLine}>
      <p className={styles.checkoutSeparatorLineNumber}>{stepNumber}</p>
      <span style={{ fontWeight: 'bold', marginLeft: '10px',color:"#333" }}>{label}</span>
      <span className={styles.line}></span>
    </div>
  );
};

export default CheckoutSeparator;

import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import styles from "@/styles/ProcessingOrder.module.css";

function ProcessingOrder() {
  return (
    <div className={styles.main}>
        <div className={styles.spinnerContainer}> <MoonLoader /><p>Processing</p></div>
     
    </div>
  );
}

export default ProcessingOrder;

"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/checkoutForm.module.css";
import checkoutSeparatorStyles from "@/styles/checkoutSeparator.module.css";

import NextImage from "next/image";
import PostiImage from "@/images/PostiGroup.png";
import DHLImage from "@/images/DHL.png";
import calculateShippingTime from "@/lib/calculateShippingTime";
import { useCheckoutContext } from "@/contexts/CheckoutContext";
import CheckoutSeparator from "./CheckoutSeparator";

function CheckoutFormShipping() {
  const { shippingOption, setShippingOption } = useCheckoutContext();

  return (
    <div className={styles.checkoutFormContainer}>
      <CheckoutSeparator stepNumber={2} label="Shipping" />
      <div className={styles.checkoutFormOptionContainer}>
        <div
          className={`${styles.checkoutFormShippingOption} ${
            shippingOption.courier === "Posti" ? styles.active : ""
          }`}
          onClick={() =>
            setShippingOption({
              courier: "Posti",
              price: 17.99,
              date: calculateShippingTime(6),
            })
          }
        >
          <input
            className={styles.checkoutFormCheckbox}
            type="checkbox"
            checked={shippingOption.courier === "Posti"}
            readOnly
          />

          <NextImage
            src={PostiImage}
            alt="Image of Posti"
            width={100}
            style={{
              objectFit: "contain",
            }}
            sizes="64px"
          />

          <p>Shipping arrives by {calculateShippingTime(6)}</p>
          <p style={{ fontSize: "12px", marginTop: "5px" }}>
            Shipping starts at 17.99€
          </p>
        </div>
        <div
          className={`${styles.checkoutFormShippingOption} ${
            shippingOption.courier === "DHL" ? styles.active : ""
          }`}
          onClick={() =>
            setShippingOption({
              courier: "DHL",
              price: 23.99,
              date: calculateShippingTime(3),
            })
          }
        >
          <input
            className={styles.checkoutFormCheckbox}
            type="checkbox"
            checked={shippingOption.courier === "DHL"}
            readOnly
          />
          <NextImage
            src={DHLImage}
            alt="Image of DHL"
            width={100}
            style={{
              objectFit: "contain",
            }}
            sizes="64px"
          />

          <p>Shipping arrives by {calculateShippingTime(3)}</p>
          <p style={{ fontSize: "12px", marginTop: "5px" }}>
            Shipping starts at 23.99€
          </p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutFormShipping;

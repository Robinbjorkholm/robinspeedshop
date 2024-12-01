"use client";
import React, { useState, useEffect, useContext } from "react";
import { CheckoutContext } from "@/contexts/CheckoutContext";
import styles from "@/styles/checkout.module.css";
import NextImage from "next/image";
import PostiImage from "@/images/PostiGroup.png";
import DHLImage from "@/images/DHL.png";
import { useCheckoutContext } from "@/contexts/CheckoutContext";

function CheckoutFormShipping() {
  const { shippingOption, setShippingOption } = useCheckoutContext();
  const [shippingDatePosti, setShippingDatePosti] = useState("");
  const [shippingDateDHL, setShippingDateDHL] = useState("");

  useEffect(() => {
    const calculateShippingTime = (days) => {
      const date = new Date();
      date.setDate(date.getDate() + days);
      return date.toLocaleDateString("en-EN", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    };

    setShippingDatePosti(calculateShippingTime(6));
    setShippingDateDHL(calculateShippingTime(3));
  }, []);
  return (
    <div className={styles.checkoutFormContainer}>
      <h2 style={{ marginLeft: "5px" }}>Shipping</h2>
      <div className={styles.checkoutFormOptionContainer}>
        <div
          className={`${styles.checkoutFormShippingOption} ${
            shippingOption === "Posti" ? styles.active : ""
          }`}
          onClick={() => setShippingOption("Posti")}
        >
          <input
            className={styles.checkoutFormCheckbox}
            type="checkbox"
            checked={shippingOption === "Posti"}
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

          <p>Shipping arrives by {shippingDatePosti}</p>
          <p style={{ fontSize: "12px", marginTop: "5px" }}>
            Shipping starts at 17.99€
          </p>
        </div>
        <div
          className={`${styles.checkoutFormShippingOption} ${
            shippingOption === "DHL" ? styles.active : ""
          }`}
          onClick={() => setShippingOption("DHL")}
        >
          <input
            className={styles.checkoutFormCheckbox}
            type="checkbox"
            checked={shippingOption === "DHL"}
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

          <p>Shipping arrives by {shippingDateDHL}</p>
          <p style={{ fontSize: "12px", marginTop: "5px" }}>
            Shipping starts at 23.99€
          </p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutFormShipping;

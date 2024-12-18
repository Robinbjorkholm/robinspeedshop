"use client";
import React, { useState, useEffect, useContext } from "react";
import styles from "@/styles/checkoutForm.module.css";
import NextImage from "next/image";
import KlarnaImage from "@/images/Klarna.png";
import PayPalImage from "@/images/PayPal.png";
import MasterCardImage from "@/images/MasterCard.png";
import { useCheckoutContext } from "@/contexts/CheckoutContext";



function CheckoutFormPayment() {
  const { paymentOption, setPaymentOption } = useCheckoutContext();

  return (
    <div className={styles.checkoutFormContainer}>
      <h2 style={{ marginLeft: "3rem" }}>Payment</h2>
      <div className={styles.checkoutFormOptionContainer}>
        <div
          className={`${styles.checkoutFormShippingOption} ${
            paymentOption === "Paypal" ? styles.active : ""
          }`}
          onClick={() => setPaymentOption("Paypal")}
        >
          <input
            className={styles.checkoutFormCheckbox}
            type="checkbox"
            checked={paymentOption === "Paypal"}
            readOnly
          />
          <NextImage
            src={PayPalImage}
            alt="Image of paypal"
            width={100}
            height={75}
            style={{
              objectFit: "contain",
            }}
            sizes="64px"
          />
          <p>paypal</p>
        </div>
        <div
          className={`${styles.checkoutFormShippingOption} ${
            paymentOption === "Card" ? styles.active : ""
          }`}
          onClick={() => setPaymentOption("Card")}
        >
          <input
            className={styles.checkoutFormCheckbox}
            type="checkbox"
            checked={paymentOption === "Card"}
            readOnly
          />
          <NextImage
            src={MasterCardImage}
            alt="Image of mastercard"
            width={100}
            height={75}
            style={{
              objectFit: "contain",
            }}
            sizes="64px"
          />
          <p>Card</p>
        </div>
        <div
          className={`${styles.checkoutFormShippingOption} ${
            paymentOption === "Klarna" ? styles.active : ""
          }`}
          onClick={() => setPaymentOption("Klarna")}
        >
          <input
            className={styles.checkoutFormCheckbox}
            type="checkbox"
            checked={paymentOption === "Klarna"}
            readOnly
          />
          <NextImage
            src={KlarnaImage}
            alt="Image of klarna payment"
            width={100}
            height={75}
            style={{
              objectFit: "contain",
            }}
            sizes="64px"
          />
          <p>Klarna</p>
        </div>
      </div>
      
    </div>
  );
}

export default CheckoutFormPayment;

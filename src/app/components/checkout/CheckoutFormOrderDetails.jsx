"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/checkoutFormOrderDetails.module.css";
import { useCart } from "@/contexts/CartContext";
import { useCheckoutContext } from "@/contexts/CheckoutContext";
import { useSession } from "next-auth/react";

function CheckoutFormOrderDetails() {
  const { data: session, status } = useSession();
  const { cartTotalPrice, cartProductsCount } = useCart();
  const { shippingOption, userFormData } = useCheckoutContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const [productsTotalPriceBeforeTax, setProductsTotalPriceBeforeTax] =
    useState(0);
  const [taxPrice, setTaxPrice] = useState(0);

  useEffect(() => {
    if (cartTotalPrice > 0) {
      setProductsTotalPriceBeforeTax(cartTotalPrice * 0.745);
      setTaxPrice(cartTotalPrice * 0.255);
    }
    if (shippingOption) {
      const newPrice = (
        shippingOption.price +
        productsTotalPriceBeforeTax +
        taxPrice
      ).toFixed(2);
      setTotalPrice(newPrice);
    }
  }, [shippingOption, cartTotalPrice]);

  console.log("formdata", userFormData);

  return (
    <div className={styles.container}>
      <hr style={{ margin: "2rem auto", width: "100%" }} />
      <h2 className={styles.sectionHeader}>Order details</h2>
      <div style={{ width: "50%", margin: "0 auto", position: "relative" }}>
        {(!shippingOption || !userFormData || cartProductsCount == 0) && (
          <p className={styles.blurredMessage}>
            Fill out the form to see order details
          </p>
        )}

        <div
          className={`${styles.mainContent} ${
            !shippingOption.price || !userFormData || cartProductsCount == 0
              ? styles.blurred
              : ""
          }`}
        >
          <ul className={styles.ulRow}>
            <li>Products</li>
            <li>{productsTotalPriceBeforeTax.toFixed(2)}€</li>
          </ul>
          <ul className={styles.ulRow}>
            <li>Tax 25.5%</li>
            <li>{taxPrice.toFixed(2)}€</li>
          </ul>
          <ul className={styles.ulRow}>
            <li>Shipping </li>
            <li>{shippingOption.price}€</li>
          </ul>
          <hr style={{ width: "99%", margin: "0 auto" }} />
          <ul className={styles.ulRow}>
            <li>Total </li>
            <li>{totalPrice}€</li>
          </ul>
          <br />
          <h3 style={{ color: "#333", padding: "5px" }}>Shipping address</h3>
          {session?.user ? (
            <ul style={{ color: "#333", padding: "5px" }}>
              <li>
                {session.user.firstName}&nbsp;{session.user.lastName}{" "}
              </li>
              <li>{session.user.address}</li>
              <li>
                {session.user.city}&nbsp; {session.user.postalCode}
              </li>
              <li>{session.user.country}</li>
            </ul>
          ) : (
            <ul className={styles.ulRow}>asdfghj</ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutFormOrderDetails;

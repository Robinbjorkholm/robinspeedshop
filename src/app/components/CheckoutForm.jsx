"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "@/styles/checkout.module.css";
import loginStyles from "@/styles/login.module.css";
import NextImage from "next/image";
import PostiImage from "@/images/PostiGroup.png";
import DHLImage from "@/images/DHL.png";
import KlarnaImage from "@/images/Klarna.png";
import PayPalImage from "@/images/PayPal.png";
import MasterCardImage from "@/images/MasterCard.png";
import { CheckoutLoginFormSkeleton } from "@/ui/skeletons";

function CheckoutForm() {
  const [shipping, setShipping] = useState("Posti");
  const [paymentOption, setPaymentOption] = useState("card");
  const [shippingDatePosti, setShippingDatePosti] = useState("");
  const [shippingDateDHL, setShippingDateDHL] = useState("");
  const [toggleGuestForm, setToggleGuestForm] = useState(false);
  const [toggleLoginForm, setToggleLoginForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session, status } = useSession();
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
    <div className={styles.checkoutContainer}>
      <form>
        <div className={styles.checkoutFormContainer}>
          <h2 style={{ marginLeft: "5px" }}>Shipping</h2>
          <div className={styles.checkoutFormOptionContainer}>
            <div
              className={`${styles.checkoutFormShippingOption} ${
                shipping === "Posti" ? styles.active : ""
              }`}
              onClick={() => setShipping("Posti")}
            >
              <input
                className={styles.checkoutFormCheckbox}
                type="checkbox"
                checked={shipping === "Posti"}
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
                shipping === "DHL" ? styles.active : ""
              }`}
              onClick={() => setShipping("DHL")}
            >
              <input
                className={styles.checkoutFormCheckbox}
                type="checkbox"
                checked={shipping === "DHL"}
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
        <hr style={{ width: "95%", margin: "0 auto" }} />
        <div className={styles.checkoutFormContainer}>
          <h2 style={{ marginLeft: "5px" }}>Payment</h2>
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
        <hr style={{ width: "95%", margin: "0 auto" }} />
        <div className={styles.checkoutFormAddress}>
          <h2 style={{ marginLeft: "5px" }}>Address</h2>
          {status === "loading" ? (
            <CheckoutLoginFormSkeleton />
          ) : (
            <div>
              {!session.user ? (
                <div>
                  <p>city: {session.user.city}</p>{" "}
                  <p>country:{session.user.country}</p>{" "}
                  <p>postalCode:{session.user.postalCode}</p>{" "}
                </div>
              ) : (
                (toggleLoginForm || toggleGuestForm) ? (
                  null
                ) : <div className={styles.checkoutFormNotLoggedIn}>
                <button
                  type="button"
                  onClick={() => setToggleGuestForm(true)}
                >
                  continue shopping as a guest
                </button>
                <h3>or</h3>
                <button
                  type="button"
                  onClick={() => setToggleLoginForm(true)}
                >
                  login with existing user
                </button>
              </div>
               
              )}
               {toggleLoginForm &&      <div>
                    <div style={{ position: "relative", width: "65%" }}>
                      <label className={loginStyles.label}>Email:</label>
                      <input
                        onChange={(event) => setEmail(event.target.value)}
                        type="email"
                        className={loginStyles.loginInput}
                      />
                    </div>
                    <div style={{ position: "relative", width: "65%" }}>
                      <label className={loginStyles.label}>Password:</label>
                      <input
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        className={loginStyles.loginInput}
                      />
                    </div>
                  </div>}
                  {toggleGuestForm &&      <div>
                    <div style={{ position: "relative", width: "65%" }}>
                      <label className={loginStyles.label}>Email:</label>
                      <input
                        onChange={(event) => setEmail(event.target.value)}
                        type="email"
                        className={loginStyles.loginInput}
                      />
                    </div>
                    <div style={{ position: "relative", width: "65%" }}>
                      <label className={loginStyles.label}>Password:</label>
                      <input
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        className={loginStyles.loginInput}
                      />
                    </div>
                  </div>}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;

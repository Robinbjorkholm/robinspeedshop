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
  const { data: session, status } = useSession();
  const [shipping, setShipping] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [shippingDatePosti, setShippingDatePosti] = useState("");
  const [shippingDateDHL, setShippingDateDHL] = useState("");
  const [toggleGuestForm, setToggleGuestForm] = useState(false);
  const [toggleLoginForm, setToggleLoginForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [name, setName] = useState("");
  const [address,setAddress] = useState("")
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber,setPhoneNumber] = useState("")

  console.log(session);
  useEffect(() => {
    if (session) {
      setCity(session.user.city);
      setCountry(session.user.country);
      setPostalCode(session.user.postalCode);
      setAddress(session.user.address)
      setName(session.user.firstName + " " + session.user.lastName);
    }

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
  }, [session]);

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
                shipping === "DHL" ? styles.active : ""
              }`}
              onClick={() => setShipping("DHL")}
            >
              <input
                className={styles.checkoutFormCheckbox}
                type="checkbox"
                checked={shipping === "DHL"}
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
        <hr style={{ width: "95%", margin: "0 auto" }} />
        <div className={styles.checkoutFormAddress}>
          <h2 style={{ marginLeft: "5px" }}>Address</h2>
          {status === "loading" ? (
            <CheckoutLoginFormSkeleton />
          ) : (
            <div>
              {session?.user ? (
                <div className={styles.userShippingInformation}>
                  <div>
                    <label>City</label>
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div>
                    {" "}
                    <label>Country</label>
                    <input
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Postal code</label>
                    <input
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                </div>
              ) : toggleLoginForm || toggleGuestForm ? null : (
                <div className={styles.checkoutFormNotLoggedIn}>
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
              {toggleLoginForm && (
                <div className={styles.guestLoginContainer}>
                  <div style={{ position: "relative", width: "65%" }}>
                    <label className={loginStyles.label}>Email:</label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className={loginStyles.loginInput}
                    />
                  </div>
                  <div style={{ position: "relative", width: "65%" }}>
                    <label className={loginStyles.label}>Password:</label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className={loginStyles.loginInput}
                    />
                  </div>
                </div>
              )}
              {toggleGuestForm && (
                <div className={styles.guestLoginContainer}>
                  <h3>Your information</h3>
                  <p style={{color:"red"}}>* <span style={{color:"red",fontSize:"12px"}}>is a required field</span></p>
                  <div style={{ position: "relative", width: "65%" }}>
                    <label className={loginStyles.label}>Email:<span style={{color:"red"}}> *</span></label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className={loginStyles.loginInput}
                      placeholder="YourEmail@example.com"
                    />
                  </div>
                  <div style={{ position: "relative", width: "65%" }}>
                    <label className={loginStyles.label}>First name:<span style={{color:"red"}}> *</span></label>
                    <input
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      className={loginStyles.loginInput}
                      placeholder="First name"
                    />
                  </div>
                  <div style={{ position: "relative", width: "65%" }}>
                    <label className={loginStyles.label}>Last name:<span style={{color:"red"}}> *</span></label>
                    <input
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      className={loginStyles.loginInput}
                      placeholder="Last name"
                    />
                  </div>
                  <div style={{ position: "relative", width: "65%" }}>
                    <label className={loginStyles.label}>Country:<span style={{color:"red"}}> *</span></label>
                    <input
                      onChange={(e) => setCountry(e.target.value)}
                      type="text"
                      className={loginStyles.loginInput}
                      placeholder="gremlings landia"
                    />
                  </div>
                  <div style={{ position: "relative", width: "65%" }}>
                    <label className={loginStyles.label}>City:<span style={{color:"red"}}> *</span></label>
                    <input
                      onChange={(e) => setCity(e.target.value)}
                      type="text"
                      className={loginStyles.loginInput}
                      placeholder="gremlin outpost"
                    />
                  </div>
                  <div style={{ position: "relative", width: "65%" }}>
                    <label className={loginStyles.label}>Street address:</label>
                    <input
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      className={loginStyles.loginInput}
                      placeholder="gremlinroad 22"
                    />
                  </div>
                  <div style={{ position: "relative", width: "65%" }}>
                    <label className={loginStyles.label}>Phone number:</label>
                    <input
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      type="tel"
                      className={loginStyles.loginInput}
                      placeholder="+358123456789"
                    />
                  </div>
                 
                </div>
              )}
            </div>
          )}
        </div>
        <button className={styles.sendOrderButton}> Confirm order</button>
      </form>
    </div>
  );
}

export default CheckoutForm;

"use client";
import React from "react";
import mainStyles from "../../styles/page.module.css";
import { useCart } from "@/contexts/CartContext";

function Checkout() {
  const { cartProductsCount } = useCart();
  return <div className={mainStyles.main}>Checkout</div>;
}

export default Checkout;

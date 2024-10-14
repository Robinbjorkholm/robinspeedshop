"use client";
import React from "react";
import styles from "@/styles/shoppingCart.module.css";
import { useCart } from "@/contexts/CartContext";

function ShoppingCart() {
  const { cartProductsCount, cartProducts } = useCart();

  const calculateTotal = (price, quantity) => {
    const totalPrice = price * quantity;
    return totalPrice;
  };

  return (
    <div className={styles.shoppingCartContainerMain}>
      <h1>Your cart {cartProductsCount} items</h1>
      <div className={styles.shoppingCartContainer}>
        <ul
          className={styles.shoppingCartInfo}
          style={{ backgroundColor: "#333" }}
        >
          <li>Item</li>
          <li>Price</li>
          <li>Quantity</li>
          <li>Total</li>
        </ul>
        <div className={styles.shoppingCartProductsDisplay}>
          {cartProducts.map((product) => {
            return (
              <ul key={product._id} className={styles.shoppingCartProducts}>
                <li>{product.title}</li>
                <li>{product.price}€</li>
                <li>{product.quantity}</li>
                <li>{calculateTotal(product.price, product.quantity)}€</li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;

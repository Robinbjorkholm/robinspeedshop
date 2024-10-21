"use client";
import React from "react";
import styles from "@/styles/shoppingCart.module.css";
import { useCart } from "@/contexts/CartContext";
import { IoIosAddCircle, IoIosRemoveCircle, IoIosClose } from "react-icons/io";
import CheckoutForm from "../components/CheckoutForm";

function Checkout() {
  const calculateTotal = (price, quantity) => {
    const totalPrice = price * quantity;

    return totalPrice.toFixed(2);
  };
  const {
    cartProductsCount,
    cartProducts,
    addToCart,
    removeOneFromCart,
    removeFromCart,
  } = useCart();

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
              <div key={product._id}>
                <ul className={styles.shoppingCartProducts}>
                  <li>{product.title}</li>
                  <li>{product.price}€</li>
                  <li>
                    <button
                      className={styles.buttonQuantity}
                      onClick={() => addToCart(product, 1)}
                    >
                      <IoIosAddCircle color="#333" size={24} />
                    </button>
                    {product.quantity}
                    <button
                      className={styles.buttonQuantity}
                      onClick={() => removeOneFromCart(product)}
                    >
                      <IoIosRemoveCircle color="#333" size={24} />
                    </button>
                  </li>
                  <li>{calculateTotal(product.price, product.quantity)}€</li>
                  <button
                    className={styles.test}
                    onClick={() => removeFromCart(product._id)}
                  >
                    <IoIosClose color="#333" size={32} />
                  </button>
                </ul>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
      <CheckoutForm />
    </div>
  );
}

export default Checkout;

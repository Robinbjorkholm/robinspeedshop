"use client";
import React from "react";
import styles from "@/styles/checkoutFormItems.module.css";
import { useCart } from "@/contexts/CartContext";
import { IoIosAddCircle, IoIosRemoveCircle, IoIosClose } from "react-icons/io";
import NextImage from "next/image";
import calculateTotalPrice from "@/lib/calculateTotalPrice";

function CheckoutItems() {
  const {
    cartProductsCount,
    cartProducts,
    addToCart,
    removeOneFromCart,
    removeFromCart,
    cartTotalPrice,
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
                  <li>
                    {" "}
                    <NextImage
                      alt={`image of ${product.title}`}
                      src={product.image[0]}
                      width={70}
                      height={70}
                      quality={100}
                    />
                    {product.title}
                  </li>
                  <li>{product.price}€</li>
                  <li>
                    <button
                      type="button"
                      className={styles.buttonQuantity}
                      onClick={() => addToCart(product, 1)}
                    >
                      <IoIosAddCircle color="#333" size={24} />
                    </button>
                    {product.quantity}
                    <button
                      type="button"
                      className={styles.buttonQuantity}
                      onClick={() => removeOneFromCart(product)}
                    >
                      <IoIosRemoveCircle color="#333" size={24} />
                    </button>
                  </li>
                  <li>
                    {calculateTotalPrice(product.price, product.quantity)}€
                    <button
                      type="button"
                      onClick={() => removeFromCart(product._id)}
                    >
                      <IoIosClose color="#333" size={32} />
                    </button>
                  </li>
                </ul>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CheckoutItems;

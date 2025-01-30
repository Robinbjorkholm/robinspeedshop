"use client";
import React from "react";
import styles from "@/styles/checkoutFormItems.module.css";
import { useCartContext } from "@/contexts/CartContext";
import { IoIosAddCircle, IoIosRemoveCircle, IoIosClose } from "react-icons/io";
import NextImage from "next/image";
import CheckoutSeparator from "./CheckoutSeparator";
import calculateTotalPrice from "@/lib/calculateTotalPrice";

function CheckoutItems() {
  const {
    cartProductsCount,
    cartProducts,
    addToCart,
    removeOneFromCart,
    removeFromCart,
    cartTotalPrice,
  } = useCartContext();

  return (
    <div className={styles.shoppingCartContainerMain}>
      <div className={styles.shoppingCartContainer}>
        <CheckoutSeparator stepNumber={1} label="Cart"/>
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
                <hr style={{width:"90%", margin:"0 auto"}} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CheckoutItems;

"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  
  useEffect(() => {
    const savedCart = localStorage.getItem("cartProducts");
    if (savedCart) {
      setCartProducts(JSON.parse(savedCart));
    }
  }, []);

 //storing the cart in localStorage instead of db for simplicity
  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  const addToCart = (product, amount) => {
    const amountNumber = Number(amount);
    setCartProducts((prevProducts) => {
      const existingItem = prevProducts.find(
        (item) => item._id === product._id
      );
      if (existingItem) {
        return prevProducts.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + amountNumber }
            : item
        );
      }

      return [...prevProducts, { ...product, quantity: amountNumber }];
    });
  };

  const removeFromCart = (productId) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  };

  const removeOneFromCart = (product) => {
    setCartProducts((prevProducts) => {
      const existingItem = prevProducts.find(
        (item) => item._id === product._id
      );

      if (existingItem) {
        if (existingItem.quantity === 1) {
          return prevProducts.filter((item) => item._id !== product._id);
        } else {
          return prevProducts.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        }
      }
      return prevProducts;
    });
  };

  const cartProductsCount = cartProducts.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotalPrice = cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addToCart,
        removeFromCart,
        cartProductsCount,
        removeOneFromCart,
        cartTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}

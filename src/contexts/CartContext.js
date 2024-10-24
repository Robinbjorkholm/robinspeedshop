"use client";
import React, { createContext, useContext, useState } from "react";
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

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
      const existingItem = prevProducts.find((item) => item._id === product._id);
  
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

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addToCart,
        removeFromCart,
        cartProductsCount,
        removeOneFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

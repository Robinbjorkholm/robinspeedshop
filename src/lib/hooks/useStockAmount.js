"use client";

import React, { useState, useEffect } from "react";

export default function useStockAmount(product) {
  const [stockAmount, setStockAmount] = useState("green");
  useEffect(() => {
    if (product) {
      calculateStockAmount(product);
    }
  }, [product]);

  const calculateStockAmount = (product) => {
    if (product.isStockProduct === false) {
      setStockAmount("green");
    }
    if (product.numberInStock > 5) {
      setStockAmount("green");
    } else if (product.numberInStock <= 5) {
      setStockAmount("yellow");
    } else if (product.numberInStock === 0) {
      setStockAmount("red");
    }
  };

  return stockAmount;
}

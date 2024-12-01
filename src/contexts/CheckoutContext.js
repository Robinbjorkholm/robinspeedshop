"use client";

import React, { createContext, useState, useContext } from "react";

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [shippingOption, setShippingOption] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [userFormData, setUserFormData] = useState({
    city: "",
    country: "",
    postalCode: "",
    address: "",
    name: "",
  });

  return (
    <CheckoutContext.Provider
      value={{
        shippingOption,
        setShippingOption,
        paymentOption,
        setPaymentOption,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckoutContext() {
  return useContext(CheckoutContext);
}

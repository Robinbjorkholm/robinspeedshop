"use client";

import React, { createContext, useState, useContext } from "react";

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [shippingOption, setShippingOption] = useState({
    courier: "",
    price: 0,
    date: "",
  });
  const [paymentOption, setPaymentOption] = useState("");
  const [userFormData, setUserFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    address: "",
    phoneNumber: "",
    postalCode: "",
  });

  return (
    <CheckoutContext.Provider
      value={{
        shippingOption,
        setShippingOption,
        paymentOption,
        setPaymentOption,
        setUserFormData,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckoutContext() {
  return useContext(CheckoutContext);
}

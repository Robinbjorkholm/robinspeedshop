"use client";
import calculateShippingTime from "@/lib/calculateShippingTime";
import React, { createContext, useState, useContext } from "react";

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [shippingOption, setShippingOption] = useState({
    courier: "Posti",
    price: 17.99,
    date: calculateShippingTime(6),
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
        userFormData,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckoutContext() {
  return useContext(CheckoutContext);
}

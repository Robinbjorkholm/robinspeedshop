import React, { createContext, useState } from "react";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [shippingOption, setShippingOption] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [formData, setFormData] = useState({});




  return (
    <CheckoutContext.Provider
      value={{ shippingOption,setShippingOption,paymentOption,setPaymentOption }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

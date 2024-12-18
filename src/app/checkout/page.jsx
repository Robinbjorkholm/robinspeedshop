"use client";
import React, { useState, useEffect } from "react";
import { useCheckoutContext } from "@/contexts/CheckoutContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { useSession } from "next-auth/react";
import styles from "@/styles/checkoutForm.module.css";
import { CheckoutLoginFormSkeleton } from "@/ui/skeletons";
import CheckoutFormGuest from "../components/checkout/CheckoutFormGuest";
import CheckoutFormShipping from "../components/checkout/CheckoutFormShipping";
import CheckoutFormPayment from "../components/checkout/CheckoutFormPayment";
import CheckoutItems from "../components/checkout/CheckoutFormItems";
import CheckoutFormOrderDetails from "../components/checkout/CheckoutFormOrderDetails";
import LoginForm from "../components/LoginForm";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email")
    .required("Email is a required field"),
  country: Yup.string().required("Country is a required field"),
  city: Yup.string().required("City is a required field"),
  address: Yup.string().required("Address is a required field"),
  firstName: Yup.string()
    .required("First name is a required field")
    .min(1)
    .max(35),
  lastName: Yup.string()
    .required("Last name is a required field")
    .min(1)
    .max(40),
  shippingOption: Yup.object()
    .shape({
      courier: Yup.string().required("Courier is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
      date: Yup.date()
       
    })
    .required("Shipping option is required"),
  paymentOption: Yup.string()
    .required("Payment option is required")
    .min(1)
    .max(40),
});

function Checkout() {
  const { data: session, status } = useSession();
  const [toggleGuestLoginForm, setToggleGuestLoginForm] = useState(true);
  const { setUserFormData, userFormData, shippingOption, paymentOption } =
    useCheckoutContext();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (session) {
      setValue("city", session.user.city, { shouldValidate: true });
      setValue("country", session.user.country, { shouldValidate: true });
      setValue("postalCode", session.user.postalCode, { shouldValidate: true });
      setValue("address", session.user.address, { shouldValidate: true });
      setValue("firstName", session.user.firstName, { shouldValidate: true });
      setValue("lastName", session.user.lastName, { shouldValidate: true });
      setValue("email", session.user.email, { shouldValidate: true });
    }
  }, [session, setValue]);
  useEffect(() => {
    setValue("shippingOption", shippingOption || {}, { shouldValidate: true });
  }, [shippingOption, setValue]);

  useEffect(() => {
    setValue("paymentOption", paymentOption || "", { shouldValidate: true });
  }, [paymentOption, setValue]);
  console.log(isValid);
  console.log(errors)
  return (
    <FormProvider
      {...{ register, handleSubmit, setValue, watch, formState: { errors } }}
    >
      <div>
        <form>
          <CheckoutItems />
          <CheckoutFormShipping />
          <CheckoutFormPayment />
          <div className={styles.checkoutFormContainer}>
            {status === "loading" ? (
              <CheckoutLoginFormSkeleton />
            ) : (
              <div>
                {!session?.user && toggleGuestLoginForm && (
                  <div>
                    {" "}
                    <hr style={{ margin: "2rem auto", width: "100%" }} />
                    <h2 style={{ marginLeft: "5px" }}>Address</h2>
                    <CheckoutFormGuest
                      setToggleGuestLoginForm={setToggleGuestLoginForm}
                      setUserFormData={setUserFormData}
                      userFormData={userFormData}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          {!toggleGuestLoginForm && !session?.user && (
            <div className={styles.checkoutFormContainer}>
              <hr style={{ margin: "2rem auto", width: "100%" }} />
              <h2 style={{ marginLeft: "5px" }}>Address</h2>
              <LoginForm />
            </div>
          )}
          <CheckoutFormOrderDetails />
          <button disabled={!isValid} className={styles.sendOrderButton}>
            {" "}
            Confirm order
          </button>
        </form>
      </div>
    </FormProvider>
  );
}

export default Checkout;

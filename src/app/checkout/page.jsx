"use client";
import React, { useState, useEffect, useContext } from "react";
import { useCheckoutContext } from "@/contexts/CheckoutContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
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
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (session) {
      setValue("city", session.user.city);
      setValue("country", session.user.country);
      setValue("postalCode", session.user.postalCode);
      setValue("address", session.user.address);
      setValue("name", session.user.firstName + " " + session.user.lastName);
    }
  }, [session]);

  return (
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
                  <h2 style={{ marginLeft: "5px" }}>Address</h2>
                  <CheckoutFormGuest
                    setToggleGuestLoginForm={setToggleGuestLoginForm}
                    register={register}
                    errors={errors}
                    setUserFormData={setUserFormData}
                    userFormData={userFormData}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {!toggleGuestLoginForm && !session?.user && <LoginForm />}
        <CheckoutFormOrderDetails />
        <button disabled={!isValid} className={styles.sendOrderButton}>
          {" "}
          Confirm order
        </button>
      </form>
    </div>
  );
}

export default Checkout;

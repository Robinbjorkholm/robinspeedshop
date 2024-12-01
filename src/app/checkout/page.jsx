"use client";
import React, { useState, useEffect, useContext } from "react";
import { useCheckoutContext } from "@/contexts/CheckoutContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import styles from "@/styles/checkout.module.css";
import { CheckoutLoginFormSkeleton } from "@/ui/skeletons";
import CheckoutFormGuest from "../components/CheckoutFormGuest";
import CheckoutFormShipping from "../components/CheckoutFormShipping";
import CheckoutFormPayment from "../components/CheckoutFormPayment";
import CheckoutItems from "../components/CheckoutItems";
import LoginForm from "../components/LoginForm";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email")
    .required("Email is a required field"),
  country: Yup.string().required("Country is a required field"),
  city: Yup.string().required("City is a required field"),
  address: Yup.string(),
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
  const { setUserFormData, shippingOption, paymentOption } =
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
        <hr style={{ width: "70%", margin: "0 auto" }} />
        <CheckoutFormPayment />
        <hr style={{ width: "70%", margin: "0 auto" }} />
        <div className={styles.checkoutFormContainer}>
          <h2 style={{ marginLeft: "5px" }}>Address</h2>
          {status === "loading" ? (
            <CheckoutLoginFormSkeleton />
          ) : (
            <div>
              {session?.user ? (
                <div className={styles.checkoutFormUserLoggedIn}>
                  <div>
                    <label>City</label>
                    <input {...register("city")} placeholder="City" />
                  </div>
                  <div>
                    {" "}
                    <label>Country</label>
                    <input {...register("country")} placeholder="Country" />
                  </div>
                  <div>
                    <label>Postal code</label>
                    <input
                      {...register("postalCode")}
                      placeholder="Postal code"
                    />
                  </div>
                  <div>
                    <label>Name</label>
                    <input {...register("name")} placeholder="Name"></input>
                  </div>
                </div>
              ) : (
                toggleGuestLoginForm && 
                <CheckoutFormGuest
                  setToggleGuestLoginForm={setToggleGuestLoginForm}
                  register={register}
                  errors={errors}
                />
              )}
            </div>
          )}
        </div>

        <button disabled={!isValid} className={styles.sendOrderButton}>
          {" "}
          Confirm order
        </button>
      </form>
      {!toggleGuestLoginForm && !session?.user && <LoginForm /> }
      
    </div>
  );
}

export default Checkout;

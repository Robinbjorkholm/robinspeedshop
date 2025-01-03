"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckoutContext } from "@/contexts/CheckoutContext";
import { useCartContext } from "@/contexts/CartContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { useSession } from "next-auth/react";
import styles from "@/styles/checkoutForm.module.css";
import { CheckoutLoginFormSkeleton } from "@/ui/skeletons";
import CheckoutFormGuest from "../components/checkoutUi/CheckoutFormGuest";
import CheckoutFormShipping from "../components/checkoutUi/CheckoutFormShipping";
import CheckoutFormPayment from "../components/checkoutUi/CheckoutFormPayment";
import CheckoutItems from "../components/checkoutUi/CheckoutFormItems";
import CheckoutFormOrderDetails from "../components/checkoutUi/CheckoutFormOrderDetails";
import ProcessingOrder from "../components/checkoutUi/ProcessingOrder";
import LoginForm from "../components/LoginForm";
import * as Yup from "yup";

const schema = Yup.object()
  .shape({
    email: Yup.string().email("Email must be a valid email"),
    guestEmail: Yup.string().email("Email must be a valid email"),
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
        date: Yup.date(),
      })
      .required("Shipping option is required"),
    paymentOption: Yup.string()
      .required("Payment option is required")
      .min(1)
      .max(40),
    cartCount: Yup.number().required("Shopping cart cant be empty").min(1),
  })
  .test(
    "email-or-guestEmail",
    "Either email or guest email must be provided",
    function (value) {
      return true;
    }
  );

function Checkout() {
  //this page collects data from all "CheckoutForms" and validates the data using yup and react-hook-form and finally allows the user to submit the order
  const { data: session, status } = useSession();
  const [toggleGuestLoginForm, setToggleGuestLoginForm] = useState(true);
  const [isLoadingProcessingOrder, setIsLoadingProcessingOrder] = useState(false);
  const { cartProducts, cartProductsCount } = useCartContext();
  const { shippingOption, paymentOption } = useCheckoutContext();
  const [responseError, setResponseError] = useState("");
  const router = useRouter();
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
    //if the user desides to login to their existing account i set all the values from their session to the values that are normally inputted in "CheckoutFormGuest"
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
  useEffect(() => {
    setValue("cartCount", cartProductsCount, { shouldVaildate: true });
  }, [cartProductsCount]);

  //had to add this function because the cartProducts is not a part of the normal "data" that comes from the input fields
  const onSubmit = (data) => {
    const newData = {
      ...data,
      cartProducts,
    };
    submitOrder(newData);
  };

  const submitOrder = async (data) => {
    setIsLoadingProcessingOrder(true)
    try {
      const response = await fetch("/api/order/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (responseData.error) {
        setIsLoadingProcessingOrder(false)
        setResponseError(responseData.error);

      }
      if (responseData.url) {
        // if the api call is succesful it returns a unique url  with the order number that goes to /order-placed/{orderNumber}
        router.push(responseData.url);
      }
    } catch (error) {
      setIsLoadingProcessingOrder(false)
      console.error("Error:", error);
    }
  };

  return (
    
      <FormProvider
        {...{ register, handleSubmit, setValue, watch, formState: { errors } }}
      >
      {isLoadingProcessingOrder && <ProcessingOrder />}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CheckoutItems />
            <CheckoutFormShipping />
            <CheckoutFormPayment />
            <div className={styles.checkoutFormContainer}>
              {status === "loading" ? (
                <CheckoutLoginFormSkeleton />
              ) : (
                <div>
                  {/* rendering the CheckoutForm for guests by default, the user can choose to login with their existing account to render the "LoginForm" below */}
                  {!session?.user && toggleGuestLoginForm && (
                    <CheckoutFormGuest
                      setToggleGuestLoginForm={setToggleGuestLoginForm}
                    />
                  )}
                </div>
              )}
            </div>
            {/*Renders LoginForm if the user is not already logged in AND the user wants to login using existing account,
          also had to add the <hr> and <h2> tag inside a div with the login form because the login form is also used in the "login page" where it wouldnt make sense to
          have the address header and separator
          
          */}
            {!toggleGuestLoginForm && !session?.user && (
              <div className={styles.checkoutFormContainer}>
                <hr style={{ margin: "2rem auto", width: "100%" }} />
                <h2 style={{ marginLeft: "5px" }}>Address</h2>
                <LoginForm />
              </div>
            )}
            <CheckoutFormOrderDetails />

            {responseError && (
              <p
                style={{
                  color: "red",
                  margin: "0 auto",
                  width: "fit-content",
                  padding: "10px",
                }}
              >
                {responseError}
              </p>
            )}
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

import React from "react";
import styles from "@/styles/orderPlaced.module.css";
import hideEmail from "@/lib/hideEmail";

async function getOrder(orderUUID) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/order/get-order/${orderUUID}`,
      {
        cache: "no-store",
      }
    );
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error(error);
  }
}

export default async function OrderPlaced({ params }) {
  const { orderUUID } = params;
  const order = await getOrder(orderUUID);
  const guestInfo = order.order.guestInfo;
  const existingUserInfo = order.order.user;
  const orderInfo = order.order;
  const orderPlacedString = order.order.orderPlacedDate;
  const orderPlacedDate = new Date(orderPlacedString);
  const newOrderPlacedDate = orderPlacedDate.toLocaleString(
    undefined,{ year: "numeric",
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,}
   
  );
  if (!order || !order.order) {
    return (
      <div>
        <h1>Order Not Found</h1>
        <p>We couldn't retrieve the order details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3>Thanks for your order!</h3>
      <hr />
      <div className={styles.orderOverview}>
        <div className={styles.userDetails}>
          {guestInfo ? (
            <ul>
              <li>
                <b>Orderer</b>
              </li>
              <li>{guestInfo.firstName}</li>
              <li>{guestInfo.address}</li>
              <li>{guestInfo.city}</li>
              <li>{guestInfo.country}</li>
              <br />
              <li>{guestInfo.email}</li>
              {guestInfo.phoneNumber && <li>{guestInfo.phoneNumber}</li>}
            </ul>
          ) : (
            <ul>
              <li>
                {existingUserInfo.firstName}&nbsp;{existingUserInfo.lastName}
              </li>
              <li>{existingUserInfo.address}</li>
              <li>
                {existingUserInfo.postalCode}&nbsp;{existingUserInfo.city}
              </li>
              <li>{existingUserInfo.fcountry}</li>
              <br />
              <li>{existingUserInfo.email}</li>
            </ul>
          )}
          <ul>
            <li><b>Shipping method</b></li>
            <li>{orderInfo.shippingOption.courier}</li>
            <li>expected delivery date {orderInfo.shippingOption.date}</li>
          </ul>
        </div>
        <div className={styles.paymentDetails}>
          <ul>
            <li>
              <b>payment method</b>
            </li>
            <li>{orderInfo.paymentOption}</li>
          </ul>
        </div>
        <div className={styles.orderDetails}>
          <ul>
            <li>
              <b>order placed</b>
            </li>
            <li>{newOrderPlacedDate}</li>
            <br />
            <li>
              <b>Order ID</b>
            </li>
            <li>{orderInfo.orderNumber}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

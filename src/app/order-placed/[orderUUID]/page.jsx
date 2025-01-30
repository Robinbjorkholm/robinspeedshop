import React from "react";
import { redirect } from "next/navigation";
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
  const dateOptions = {
    year: "numeric",
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const dateString = order.order.shippingOption.date;
  const orderPlacedString = order.order.orderPlacedDate;
  const dateObject = new Date(dateString);
  const orderPlacedDate = new Date(orderPlacedString);
  const newDate = dateObject.toLocaleString("fi-FI", { dateOptions });
  const newOrderPlacedDate = orderPlacedDate.toLocaleString("fi-FI", {
    dateOptions,
  });
  if (!order) {
    return (
      <div>
        <h1>Order Not Found</h1>
        <p>We couldn't retrieve the order details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {order.order.guestInfo && (
        <div style={{ padding: "10px" }}>
          <h1>Thank you for your order!</h1>
          <div style={{ marginLeft: "16px" }}>
            <p>Your order has been placed succesfully.</p>
            <p>An email with your order details will be sent to {hideEmail(order.order.guestInfo.email)}.</p>

            <p>
              <b style={{ color: "#B0B0B0" }}>Order number</b> &nbsp;
              {order.order.orderNumber}
            </p>
            <p>
              <b style={{ color: "#B0B0B0" }}>Order date</b>&nbsp;
              {newOrderPlacedDate}
            </p>
            <p> Estimated deliveryx {newDate}</p>
            <ul className={styles.userInformation}>
              <li>{order.order.guestInfo.firstName}</li>
              <li>{order.order.guestInfo.lastName}</li>
              <li>{order.order.guestInfo.country}</li>
              <li>{order.order.guestInfo.city}</li>
              <li>{order.order.guestInfo.address}</li>
              <li>{order.order.guestInfo.lastName}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

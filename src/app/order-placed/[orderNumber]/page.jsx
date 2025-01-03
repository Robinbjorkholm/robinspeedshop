import React from "react";

function OrderPlaced({ params }) {
  const { orderNumber } = params;
  return <div>OrderPlaced {orderNumber}</div>;
}

export default OrderPlaced;

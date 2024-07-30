import React from "react";
import Card from "../../components/Card";

function ProductDetails({ params }) {
  return (
    <Card
      id={params.ProductId}
      title={params.title}
      description={params.description}
      price={params.price}
    />
  );
}

export default ProductDetails;

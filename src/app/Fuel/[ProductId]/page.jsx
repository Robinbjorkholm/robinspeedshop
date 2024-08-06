import React from "react";
import Card from "../../components/Card";

function ProductDetails({ id, title, description, price }) {
  return (
    <div>
      <Card key={id} title={title} description={description} price={price} />
    </div>
  );
}

export default ProductDetails;

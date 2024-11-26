import React from "react";
import NextImage from "next/image";

export default function imageModal(productImage) {
  return (
    <div>
      <NextImage src={productImage} fill />
    </div>
  );
}



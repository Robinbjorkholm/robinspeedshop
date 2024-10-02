import React from "react";
import NextImage from "next/image";

function imageModal(productImage) {
  return (
    <div>
      <NextImage src={productImage} fill />
    </div>
  );
}

export default imageModal;

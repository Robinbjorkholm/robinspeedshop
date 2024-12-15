"use client";

import React from "react";
import Link from "next/link";
import styles from "@/styles/productCards.module.css";
import NextImage from "next/image";
import { ProductsSkeleton } from "@/ui/skeletons";
import useStockAmount from "@/lib/hooks/useStockAmount";
import { useCart } from "@/contexts/CartContext";
import calculateDiscountedPrice from "@/lib/calculateDiscountedPrice";

function ProductCard({ product }) {
  const stockColor = useStockAmount(product);
  const { addToCart } = useCart();

  return (
    <div className={styles.gridItem}>
      <div className={styles.imageWrapper}>
        <NextImage
          src={product.image[0]}
          fill
          style={{ objectFit: "contain" }}
          quality={100}
          alt={product.title}
        />
        {product.isOnSale && (
          <p className={styles.productDiscount}>-{product.saleDiscount}%</p>
        )}
      </div>
      <p>{product.title}</p>

      {product.isStockProduct ? (
        <p
          style={{
            color: stockColor,
            fontWeight: "bold",
            paddingBottom: "5px",
          }}
        >
          {product.numberInStock} In stock
        </p>
      ) : (
        <p
          style={{
            color: "#333",
            fontWeight: "bold",
            paddingBottom: "5px",
          }}
        >
          In stock
        </p>
      )}

      {product.isOnSale ? (
        <div>
          <p style={{ textDecoration: "line-through" }}>{product.price}€</p>
          <p style={{ color: "red", fontWeight: "bold" }}>
            {calculateDiscountedPrice(product)}€
          </p>
        </div>
      ) : (
        <p style={{ fontWeight: "bold" }}>{product.price}€</p>
      )}

      <div className={styles.buttonContainer}>
        <Link
          href={`${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/shop/${product.category}/${product._id}`}
        >
          <button className={styles.buttonMoreInfo}>More info</button>
        </Link>
        <button
          className={styles.buttonAddToCart}
          onClick={() => addToCart(product,1)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

function DisplayProductsCards({ products }) {
  if (!products) {
    return <ProductsSkeleton />;
  }

  return (
    <div className={styles.gridContainer}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default DisplayProductsCards;

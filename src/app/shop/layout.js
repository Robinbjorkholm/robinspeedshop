"use client";
import React from "react";
import styles from "../../styles/page.module.css";
import { usePathname } from "next/navigation";
import { ProductsSkeleton } from "../../ui/skeletons";

export default function ShopLayout({ children }) {
  const pathname = usePathname();
  const isOnProductDetailPage =
    /^\/shop\/(engine|chassis|drivetrain|engine-management|fuel)\/[^\/]+$/.test(
      pathname
    );
  return (
    <div className={styles.main}>
      {" "}
      {!isOnProductDetailPage && <ProductsSkeleton />}
      {children}
    </div>
  );
}

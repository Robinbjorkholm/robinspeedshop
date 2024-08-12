import React from "react";
import mainStyles from "../page.module.css";
import { ProductsSkeleton } from "../../ui/skeletons";

export default function ShopLayout({ children }) {
  return (
    <div className={mainStyles.main}>
      {" "}
      <ProductsSkeleton />
      {children}
    </div>
  );
}

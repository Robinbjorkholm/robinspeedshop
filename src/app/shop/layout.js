import React from "react";
import Filter from "../components/Filter";
import mainStyles from "../page.module.css";

export default function ShopLayout({ children }) {
  return (
    <div className={mainStyles.main}>
      {" "}
      <Filter />
      {children}
    </div>
  );
}

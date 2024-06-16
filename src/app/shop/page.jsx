import React from "react";
import Filter from "../components/Filter";
import mainStyles from "../page.module.css";

function Shop() {
  return (
    <div className={mainStyles.main}>
      <Filter />
    </div>
  );
}

export default Shop;

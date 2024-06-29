import React from "react";
import styles from "../../styles/navbar.module.css";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.navbarLink}>
        Shop
      </Link>

      <Link href="/Login" className={styles.navbarLink}>
        log in
      </Link>
      <Link href="/Checkout" className={styles.navbarLink}>
        <div className={styles.checkout}>
          <TiShoppingCart size={"2em"} color={"white"} />
          <p className={styles.checkoutAmount}>5</p>
        </div>
      </Link>
    </nav>
  );
}

export default Navbar;

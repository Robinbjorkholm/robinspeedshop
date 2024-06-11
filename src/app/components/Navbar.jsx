import React from "react";
import styles from "../../styles/navbar.module.css";
import Link from "next/link";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.navbarItem}>
        home
      </Link>
      <Link href="/" className={styles.navbarItem}>
        about
      </Link>
      <Link href="/" className={styles.navbarItem}>
        contact
      </Link>
      <Link href="/checkout" className={styles.navbarItem}>
        checkout
      </Link>
    </nav>
  );
}

export default Navbar;

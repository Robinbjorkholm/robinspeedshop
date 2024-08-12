import React from "react";
import styles from "../../styles/filter.module.css";
import Link from "next/link";

function Filter() {
  return (
    <nav className={styles.navbarFilter}>
      <ul className={styles.navLinks}>
        <Link href="/shop/engine" className={styles.navLink}>
          Engine
        </Link>
        <Link href="/shop/fuel" className={styles.navLink}>
          Fuel
        </Link>
        <Link href="/shop/chassis" className={styles.navLink}>
          Chassis
        </Link>
        <Link href="/shop/engine-management" className={styles.navLink}>
          Engine management
        </Link>
        <Link href="/shop/drivetrain" className={styles.navLink}>
          Drivetrain
        </Link>
      </ul>
    </nav>
  );
}

export default Filter;

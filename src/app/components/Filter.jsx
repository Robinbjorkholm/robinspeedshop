import React from "react";
import styles from "../../styles/filter.module.css";
import Link from "next/link";

function Filter() {
  return (
    <nav class={styles.navbar}>
      <ul class={styles.navLinks}>
        <Link href="/shop/engine" class={styles.navLink}>
          Engine
        </Link>
        <Link href="/shop/fuel" class={styles.navLink}>
          Fuel
        </Link>
        <Link href="/shop/chassis" class={styles.navLink}>
          Chassis
        </Link>
        <Link href="/shop/enginemanagement" class={styles.navLink}>
          Engine management
        </Link>
        <Link href="/shop/drivetrain" class={styles.navLink}>
          Drivetrain
        </Link>
      </ul>
    </nav>
  );
}

export default Filter;

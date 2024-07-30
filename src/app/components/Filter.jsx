import React from "react";
import styles from "../../styles/filter.module.css";
import Link from "next/link";

function Filter() {
  return (
    <nav className={styles.navbarFilter}>
      <ul className={styles.navLinks}>
        <Link href="/engine" className={styles.navLink}>
          Engine
        </Link>
        <Link href="/fuel" className={styles.navLink}>
          Fuel
        </Link>
        <Link href="/chassis" className={styles.navLink}>
          Chassis
        </Link>
        <Link href="/engine-management" className={styles.navLink}>
          Engine management
        </Link>
        <Link href="/drivetrain" className={styles.navLink}>
          Drivetrain
        </Link>
      </ul> 
    </nav>
  );
}

export default Filter;

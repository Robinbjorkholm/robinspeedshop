import React from "react";
import styles from "../../styles/filter.module.css";
import Link from "next/link";

function Filter() {
  return (
    <nav className={styles.navbarFilter}>
      <ul className={styles.navLinks}>
        <Link href="/Engine" className={styles.navLink}>
          Engine
        </Link>
        <Link href="/Fuel" className={styles.navLink}>
          Fuel
        </Link>
        <Link href="/Chassis" className={styles.navLink}>
          Chassis
        </Link>
        <Link href="/Enginemanagement" className={styles.navLink}>
          Engine management
        </Link>
        <Link href="/Drivetrain" className={styles.navLink}>
          Drivetrain
        </Link>
      </ul> 
    </nav>
  );
}

export default Filter;

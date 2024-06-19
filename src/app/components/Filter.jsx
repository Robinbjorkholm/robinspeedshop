import React from "react";
import styles from "../../styles/filter.module.css";
import Link from "next/link";

function Filter() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <Link href="/Shop/Engine" className={styles.navLink}>
          Engine
        </Link>
        <Link href="/Shop/Fuel" className={styles.navLink}>
          Fuel
        </Link>
        <Link href="/Shop/Chassis" className={styles.navLink}>
          Chassis
        </Link>
        <Link href="/Shop/Enginemanagement" className={styles.navLink}>
          Engine management
        </Link>
        <Link href="/Shop/Drivetrain" className={styles.navLink}>
          Drivetrain
        </Link>
      </ul> 
    </nav>
  );
}

export default Filter;

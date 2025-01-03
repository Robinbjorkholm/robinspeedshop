"use client";
import React from "react";
import styles from "../../styles/navbar.module.css";
import Link from "next/link";
import { useCartContext } from "@/contexts/CartContext";
import { TiShoppingCart } from "react-icons/ti";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { MdLogin, MdLogout } from "react-icons/md";

function Navbar() {
  const { data: session } = useSession();
  const { cartProductsCount } = useCartContext();

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.navbarLink}>
        Shop
      </Link>
      {session?.user?.admin && (
        <Link href="/admin" className={styles.navbarLink}>
          ADMIN
        </Link>
      )}{" "}
      {session?.user?.admin && (
        <Link href="/admin/create-product" className={styles.navbarLink}>
          ADD PRODUCT
        </Link>
      )}
      {session ? (
        <button className={styles.navbarLink} onClick={signOut}>
          <MdLogout size={32} />
          Logout
        </button>
      ) : (
        <Link href="/login" className={styles.navbarLink}>
          <MdLogin size={32} /> Log in
        </Link>
      )}
      <Link href="/checkout" className={styles.navbarLink}>
        <div className={styles.checkout}>
          <TiShoppingCart size={"2em"} color={"white"} />
          <p className={styles.checkoutAmount}>{cartProductsCount}</p>
        </div>
      </Link>
    </nav>
  );
}

export default Navbar;

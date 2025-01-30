"use client";
import { usePathname } from "next/navigation";
import Filter from "./Filter";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const hideFilter =
    pathname.startsWith("/checkout") || pathname.startsWith("/order-placed");

  return (
    <>
      {!hideFilter && <Filter />}
      {children}
    </>
  );
}

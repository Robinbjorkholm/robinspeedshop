'use client'

import { usePathname } from "next/navigation";
import Filter from "./Filter";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const hideFilter = ["/checkout"].includes(pathname);

  return (
    <>
      {!hideFilter && <Filter />}
      {children}
    </>
  );
}
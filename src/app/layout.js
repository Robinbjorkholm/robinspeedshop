import { Inter } from "next/font/google";
import ClientWrapper from "./components/ClientWrapper";
import "../styles/globals.css";
import Filter from "./components/Filter";
import AuthProvider from "./components/AuthProvider";
import Navbar from "./components/Navbar";
import { CartProvider } from "@/contexts/CartContext";
import { CheckoutProvider } from "@/contexts/CheckoutContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CheckoutProvider>
            <CartProvider>
              <Navbar />
              <ClientWrapper>{children}</ClientWrapper>
            </CartProvider>
          </CheckoutProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

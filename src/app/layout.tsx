import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartProvider from "@/components/CartProvider";

export const metadata: Metadata = {
  title: "NiyaSports - Premium Sports Gear & Apparel",
  description: "Shop the best sports equipment, apparel, and accessories at NiyaSports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

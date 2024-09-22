import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Outfit } from "next/font/google";
import Script from "next/script";

const outfit = Outfit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Quick Docs",
  description: "A Student platform tailored to ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>{children}</body>
        <Script
          async
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        ></Script>
        <script
          async
          noModule
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
        ></script>
      </html>
    </ClerkProvider>
  );
}

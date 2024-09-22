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
    <html lang="en">
      <body className={outfit.className}>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}

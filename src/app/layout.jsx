import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Student Study Portal",
  description: "A Student platform tailored to provide course materials, quizzes and an open chatroom for all to share knowledge and learn.",
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

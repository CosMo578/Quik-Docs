"use client";
import NavBar from "@/components/NavBar";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { adminEmails } from "../../../adminEmail";
import { useEffect } from "react";

export default function Layout({ children }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      const userEmail = user?.emailAddresses[0]?.emailAddress;

      if (!adminEmails.includes(userEmail)) {
        router.push("/home"); // Redirect non-admins
      }
    }
  }, [user, isLoaded, router]);

  if (!isLoaded) return null;

  return (
    <>
      <NavBar />
      <div className="p-4 lg:ml-64">{children}</div>
    </>
  );
}

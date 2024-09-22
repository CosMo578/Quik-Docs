"use client";
import NavBar from "@/components/NavBar";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { adminEmails } from '../../../adminEmail';

export default function Layout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  let userEmail = user?.emailAddresses.emailAddress;
  !adminEmails.includes(userEmail) && router.push("/home");

  // user?.emailAddresses.emailAddress !== "raphaelakpor@gmail.com" &&
  //   redirect("/home");

  return (
    <>
      <NavBar />
      <div className="p-4 lg:ml-64">{children}</div>
    </>
  );
}

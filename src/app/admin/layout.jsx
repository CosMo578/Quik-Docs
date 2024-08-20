"use client";
import Link from "next/link";
import Image from "next/image";
import { LibraryBig, Upload } from "lucide-react";
import { usePathname } from "next/navigation";
import SignedHeader from "@/components/SignedHeader";

const SideNavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="h-screen flex-col pl-6 shadow-lg md:w-[20vw]">
      <div className="py-8">
        <Image src="/logoipsum.svg" alt="logo" width={40} height={40} />
      </div>

      <ul className="space-y-4 [&_li]:rounded-l-lg [&_li]:p-4">
        <li
          className={
            pathname == "/admin"
              ? "bg-primary-100 text-white"
              : "bg-neutral-100 text-neutral-600"
          }
        >
          <Link className="flex items-center gap-4" href="/admin">
            <Upload /> Upload Files
          </Link>
        </li>
        <li
          className={
            pathname == "/admin/create-quiz"
              ? "bg-primary-100 text-white"
              : "bg-neutral-100 text-neutral-600"
          }
        >
          <Link className="flex items-center gap-4" href="/admin/create-quiz">
            <LibraryBig /> Create Quizzes
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default function Layout({ children }) {
  return (
    <section className="flex items-start overflow-hidden">
      <SideNavBar />
      <div className="flex-col md:w-[80vw]">
        <SignedHeader />
        {children}
      </div>
    </section>
  );
}

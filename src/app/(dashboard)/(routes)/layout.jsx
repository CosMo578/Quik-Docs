"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SignedHeader from "@/components/SignedHeader";
import { LibraryBig, SquarePen, MessageSquareText } from "lucide-react";

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
            pathname == "/home"
              ? "bg-primary-100 text-white"
              : "bg-neutral-100 text-neutral-600"
          }
        >
          <Link className="flex items-center gap-4" href="/home">
            <LibraryBig /> Course Materials
          </Link>
        </li>
        <li
          className={
            pathname == "/quizzes"
              ? "bg-primary-100 text-white"
              : "bg-neutral-100 text-neutral-600"
          }
        >
          <Link className="flex items-center gap-4" href="/quizzes">
            <SquarePen /> Quizzes
          </Link>
        </li>
        <li
          className={
            pathname == "/chatroom"
              ? "bg-primary-100 text-white"
              : "bg-neutral-100 text-neutral-600"
          }
        >
          <Link className="flex items-center gap-4" href="/chatroom">
            <MessageSquareText /> Chatroom
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
// <section>
//   <header className="flex items-center justify-between">
//     <ion-icon src="/logoipsum.svg"></ion-icon>
//     <SignedHeader />
//   </header>
//   <SideNavBar />
//   {children}
// </section>

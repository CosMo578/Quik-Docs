"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LibraryBig, MessageSquareText, SquarePen, Upload } from "lucide-react";
import { adminEmails } from "../../adminEmail";

const NavBar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const userEmail = user?.emailAddresses.emailAddress;
  const [isOpen, setIsOpen] = useState(false);
  // const isAdmin = userEmail && adminEmails.includes(userEmail);
  function findEmailMatch(emailAddresses, inputEmail) {
    if (emailAddresses.includes(inputEmail)) {
      return true;
    } else {
      return false;
    }
  }
  const isAdmin = findEmailMatch(adminEmails, userEmail);


  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="p-5 py-7 lg:px-8 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                type="button"
                className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="h-6 w-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>

              <Link className="ms-2 flex text-primary-300 md:me-24" href="/">
                <Image
                  className="me-3 h-8 text-3xl"
                  src="/logoipsum.svg"
                  alt=""
                  width={40}
                  height={25}
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl">
                  Quik Docs
                </span>
              </Link>
            </div>

            <div className="scale-[1.5]">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white pt-28 transition-transform lg:translate-x-0 ${!isOpen && "-translate-x-full"}`}
      >
        <div className="h-full overflow-y-auto bg-white px-3 pb-4">
          <ul className="space-y-5 font-medium">
            {isAdmin && (
              <li
                className={`${pathname == "/admin" ? "bg-primary-100 text-white" : "bg-neutral-100 text-neutral-600"} group flex items-center rounded-lg p-5`}
              >
                <Link className="flex items-center gap-4" href="/admin">
                  <Upload /> Upload Files
                </Link>
              </li>
            )}

            <li
              className={`${pathname == "/home" ? "bg-primary-100 text-white" : "bg-neutral-100 text-neutral-600"} group flex items-center rounded-lg p-5`}
            >
              <Link className="flex items-center gap-4" href="/home">
                <LibraryBig /> Course Materials
              </Link>
            </li>

            <li
              className={`${pathname == "/quiz" ? "bg-primary-100 text-white" : "bg-neutral-100 text-neutral-600"} group flex items-center rounded-lg p-5`}
            >
              <Link className="flex items-center gap-4" href="/quiz">
                <SquarePen /> Quizzes
              </Link>
            </li>

            <li
              className={`${pathname == "/chatroom" ? "bg-primary-100 text-white" : "bg-neutral-100 text-neutral-600"} group flex items-center rounded-lg p-5`}
            >
              <Link className="flex items-center gap-4" href="/chatroom">
                <MessageSquareText /> Chatroom
              </Link>
            </li>

            {isAdmin && (
              <li
                className={`${pathname == "/admin/create-quiz" ? "bg-primary-100 text-white" : "bg-neutral-100 text-neutral-600"} group flex items-center rounded-lg p-5`}
              >
                <Link
                  className="flex items-center gap-4"
                  href="/admin/create-quiz"
                >
                  <LibraryBig /> Create Quizzes
                </Link>
              </li>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default NavBar;

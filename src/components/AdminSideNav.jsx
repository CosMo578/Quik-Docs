"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LibraryBig, MessageSquareText, SquarePen, Upload } from "lucide-react";

const SideNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav class="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div class="p-5 py-7 lg:px-8 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start rtl:justify-end">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                type="button"
                class="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden"
              >
                <span class="sr-only">Open sidebar</span>
                <svg
                  class="h-6 w-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
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
                <span class="self-center whitespace-nowrap text-xl font-semibold sm:text-2xl dark:text-white">
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
        id="logo-sidebar"
        class={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white pt-28 transition-transform lg:translate-x-0 ${!isOpen && "-translate-x-full"}`}
        aria-label="Sidebar"
      >
        <div class="h-full overflow-y-auto bg-white px-3 pb-4">
          <ul class="space-y-5 font-medium">
            <li
              className={`${pathname == "/admin" ? "bg-primary-100 text-white" : "bg-neutral-100 text-neutral-600"} group flex items-center rounded-lg p-5`}
            >
              <Link className="flex items-center gap-4" href="/admin">
                <Upload /> Upload Files
              </Link>
            </li>

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
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideNav;

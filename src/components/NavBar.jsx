"use client";
import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { adminEmails } from "../../adminEmail";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  Album,
  CircleCheckBig,
  LayoutDashboard,
  LibraryBig,
  ListCollapse,
  LogOut,
  MessageCircleMore,
  MessageSquareText,
  SquarePen,
  Upload,
} from "lucide-react";
import { AuthContext } from "@/app/Context/AuthContext";
import { Menu, MenuItem, MenuItems, MenuButton } from "@headlessui/react";
import { signOut } from 'firebase/auth';
import { auth } from '@/app/config/firebase';
import { Router } from 'next/router';

const NavBar = () => {
  const pathname = usePathname();
  const { currentUser } = useContext(AuthContext);

  const userEmail = currentUser?.email;
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = adminEmails.includes(userEmail); // Check if the user is an admin

  const logout = async () => {
    try {
      signOut(auth);
      document.cookie = "token=; Max-Age=0; path=/"; // Clear token
      Router.push("/"); // Redirect to login
    } catch (error) {
      console.log(error);
    }
  };

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
                  className="me-3 text-3xl"
                  src="/pti-logo.svg"
                  alt=""
                  width={50}
                  height={50}
                />
                <span className="hidden self-center whitespace-nowrap text-2xl font-semibold lg:block">
                  Student Study Portal
                </span>
              </Link>
            </div>

            <div>
              {currentUser ? (
                <Menu as="div" className="relative ml-3">
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="cursor-pointer rounded-full"
                      src="/user-dummy.png"
                      alt="user photo"
                      width={50}
                      height={50}
                    />
                  </MenuButton>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {/* <MenuItem>
                          <Link
                            href="/seller/my-products"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                          >
                            <ListCollapse className="me-2 inline size-4" />
                            My Products
                          </Link>
                        </MenuItem> */}

                    <MenuItem>
                      <span
                        onClick={() => logout()}
                        className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        <LogOut className="me-2 inline size-4" /> Sign out
                      </span>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <Link href="/login">
                  <button
                    type="button"
                    className="bg-primary-100 rounded-lg px-4 py-2 text-center font-bold text-white"
                  >
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white pt-32 transition-transform lg:translate-x-0 ${!isOpen && "-translate-x-full"}`}
      >
        <div className="h-full overflow-y-auto bg-white px-3 pb-4">
          <ul className="flex flex-col gap-5 font-medium">
            {isAdmin && (
            <Link href="/admin">
              <li
                className={`${pathname == "/admin" ? "bg-primary-100 text-white" : "bg-neutral-100 text-neutral-600"} group flex items-center gap-4 rounded-lg p-5`}
              >
                <Upload /> Upload Files
              </li>
            </Link>
            )}

            <Link href="/home">
              <li
                className={`${pathname == "/home" ? "bg-primary-100 text-white" : "bg-neutral-100 text-neutral-600"} group flex items-center gap-4 rounded-lg p-5`}
              >
                <LibraryBig /> Course Materials
              </li>
            </Link>

            <Link href="/pastQuestions">
              <li
                className={`${pathname == "/pastQuestions" ? "bg-primary-100 text-white" : "bg-neutral-100 text-neutral-600"} group flex items-center gap-4 rounded-lg p-5`}
              >
                <Album /> Past Questions
              </li>
            </Link>

            <Link href="/quiz">
              <li
                className={`${pathname.includes("/quiz") ? "bg-primary-100 text-white" : "bg-neutral-100 text-neutral-600"} group flex items-center gap-4 rounded-lg p-5`}
              >
                <SquarePen /> Quizzes
              </li>
            </Link>

            <Link href="/chatroom">
              <li
                className={`${pathname == "/chatroom" ? "bg-primary-100 text-white" : "bg-neutral-100 text-neutral-600"} group flex items-center gap-4 rounded-lg p-5`}
              >
                <MessageSquareText /> Chatroom
              </li>
            </Link>
          </ul>
        </div>
      </aside>
    </>
  );
};
export default NavBar;

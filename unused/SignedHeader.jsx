import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const SignedHeader = () => {
  return (
    <header className="flex items-center w-full justify-between bg-gray-50 px-10 py-8 shadow-md">
      <Link className="block text-primary-300" href="/">
        <Image
          className="text-3xl"
          src="/logoipsum.svg"
          alt=""
          width={40}
          height={25}
        />
      </Link>

      <div className="scale-[1.5]">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};
export default SignedHeader;

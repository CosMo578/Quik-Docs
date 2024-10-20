import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-50 py-4 shadow-md">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a className="block text-primary-300" href="/">
              <span className="sr-only">Home</span>
              {/* <Image
                className="text-3xl"
                src="/logoipsum.svg"
                alt=""
                width={40}
                height={25}
              /> */}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <Link
                className="rounded-lg bg-primary-300 px-6 py-2.5 font-semibold text-white shadow hover:bg-primary-500"
                href="/sign-in"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;

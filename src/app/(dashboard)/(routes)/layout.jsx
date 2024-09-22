import NavBar from "@/components/NavBar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      {/* <div class="p-4 lg:ml-64 lg:pt-16 grid place-items-center max-md:w-screen max-md:h-screen">{children}</div> */}
      <div className="lg:ml-64 pt-16">{children}</div>
    </>
  );
}

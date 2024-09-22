import SideNav from "@/components/SideNav";

export default function Layout({ children }) {
  return (
    <>
      <SideNav />
      {/* <div class="p-4 lg:ml-64 lg:pt-16 grid place-items-center max-md:w-screen max-md:h-screen">{children}</div> */}
      <div class="lg:ml-64 pt-16">{children}</div>
    </>
  );
}

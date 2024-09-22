import AdminSideNav from "@/components/AdminSideNav";
import { redirect } from "next/navigation";


export default function Layout({ children }) {
  useUser.emailAddresses.emailAddress !== "raphaelakpor00@gmail.com" &&
    redirect("/home");

  return (
    <>
      <AdminSideNav />
      <div class="p-4 lg:ml-64">{children}</div>
    </>
  );
}

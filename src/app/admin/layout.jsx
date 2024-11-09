import NavBar from "@/components/NavBar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div className="p-4 lg:ml-64">{children}</div>
    </>
  );
}

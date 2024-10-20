import NavBar from "@/components/NavBar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div className="lg:ml-64 pt-16">{children}</div>
    </>
  );
}

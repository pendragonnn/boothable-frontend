import { Navbar, Footer } from "@/components/shared";

export default function LandingPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-[88px]">{children}</main>
      <Footer />
    </div>
  );
}

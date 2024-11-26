import Footer from "@/components/footer";
import Header from "@/components/header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="wrap" className="flex flex-col min-h-dvh bg-slate-100">
      <Header />
      <main className="flex-grow p-5 mx-auto w-full xl:container lg:max-w-screen-xl">{children}</main>
      <Footer />
    </div>
  );
}

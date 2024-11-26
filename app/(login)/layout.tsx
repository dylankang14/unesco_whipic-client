import Footer from "@/components/footer";
import Header from "@/components/header";
import ModalUpload from "@/components/modal-upload";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="wrap" className="flex flex-col min-h-dvh">
      <main className="flex-grow mx-auto xl:container lg:max-w-screen-xl">{children}</main>
    </div>
  );
}

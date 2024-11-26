import Image from "next/image";
import logo from "../public/logo_main_w.png";

export default function Footer() {
  return (
    <footer className="footer bg-neutral text-neutral-content justify-center items-center p-4">
      <aside className="grid-flow-col items-center">
        <Image alt="유네스코 로고" src={logo} width={118} height={46} />
        <p className="ml-4">Unesco Whipic © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  );
}

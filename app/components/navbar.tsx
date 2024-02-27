import Link from "next/link";

export default function Header() {
  return (
    <nav className="fixed w-screen shadow-xl bg-indigo-600  py-4 px-4">
      <div className="md:container mx-auto flex justify-between">
        <img src="" alt="logo" className="w-2/12" />
        <ul className="flex justify-between gap-x-6">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="about">Sobre</Link>
          </li>
          <li>
            <Link href="contact">Contato</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

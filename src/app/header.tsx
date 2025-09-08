"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = [
  {
    link: "/",
    text: "Incio",
  },
  {
    link: "/reports",
    text: "Reportes",
  },
  {
    link: "/about",
    text: "Nosotros",
  },
  {
    link: "/FlapyTrack",
    text: "Flapy Track",
  },
];
export default function Header() {
  const Pathname = usePathname() 
  return (
    <header className="w-full fixed top-0 left-0 right-0 flex justify-center items-center mt-2">
      <nav id="effect-scroll-navigation" className="flex px-3 rounded-full">
        {Navigation.map((items) => (
          <Link href={items.link} className={`p-2 ${Pathname === items.link ? '' :'' }`} key={items.link}>
            <span className={`pb-0.5 flex ${Pathname === items.link ? 'effect-hover-navigation-static' : 'effect-hover-navigation'} relative`}>
              {items.text}
            </span>
          </Link>
        ))}
      </nav>
    </header>
  );
}

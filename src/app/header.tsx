"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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
    link: "/questions",
    text: "Quiz",
  }
];
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Pathname = usePathname();
  return (
    <header className="w-full fixed top-0 left-0 right-0 flex z-[9999] justify-center items-center mt-2">
      <nav id="effect-scroll-navigation" className={`flex px-3 rounded-full ${isScrolled ? 'bg-white/80 saturate-200 backdrop-blur-md dark:bg-bg-darck/80 shadow-md' : 'bg-transparent'} transition-colors duration-300`}>
        {Navigation.map((items) => (
          <Link
            href={items.link}
            className={`p-2 ${Pathname === items.link ? "" : ""}`}
            key={items.link}
          >
            <span
              className={`pb-0.5 flex ${
                Pathname === items.link
                  ? "effect-hover-navigation-static"
                  : "effect-hover-navigation"
              } relative`}
            >
              {items.text}
            </span>
          </Link>
        ))}
      </nav>
    </header>
  );
}

"use client";
import { usePathname } from "next/navigation";

export default function Footer() {
  const Pathname = usePathname() 

  return (
    <div  className="w-full flex px-4  justify-center">
    <footer className={`max-w-4xl flex w-full justify-between  py-16 ${Pathname === "/FlapyTrack" ? 'hidden': ''}`}>
            <p>© 2025 creado por AmbiTrack</p>
            <ol className="flex gap-4" >
                <a href="" target="_blank" className="text-black/85 dark:text-white/85 hover:text-black dark:hover:text-white transition-all duration-200 ease-linear hover:underline" >Instagram</a>
                <a href="" target="_blank" className="text-black/85 dark:text-white/85 hover:text-black dark:hover:text-white transition-all duration-200 ease-linear hover:underline" >Facebook</a>
                <a href="" target="_blank" className="text-black/85 dark:text-white/85 hover:text-black dark:hover:text-white transition-all duration-200 ease-linear hover:underline" >Twitter</a>
                <a href="https://github.com/munozalvear/landing-ambitrack" target="_blank" className="text-black/85 dark:text-white/85 hover:text-black dark:hover:text-white transition-all duration-200 ease-linear hover:underline" >GitHub</a>
            </ol>
    </footer>

    </div>
  );
}

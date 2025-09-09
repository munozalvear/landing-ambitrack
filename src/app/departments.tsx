"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Colombia } from "@/app/lib/departments";

export default function Departments() {
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let isScrollingDown = true;
    
    // Listener para detectar dirección del scroll
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      isScrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && isScrollingDown) {
          entry.target.classList.add("visible");
        }
        // No removemos la clase "visible" cuando sale de la vista
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });
    
    document.querySelectorAll(".fade-section").forEach((el) => observer.observe(el));
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="flex flex-col max-w-4xl mx-auto pb-36">
      <h1 className="text-6xl font-extrabold mb-10">Donde Reportar</h1>
      <div className="grid departmentsgrid gap-5  w-full h-full auto-rows-[300px]">
        {Colombia.map(({ name, image, description, capital }) => (
          <a
            href={`https://es.wikipedia.org/wiki/${name}_(Colombia)`}
            className="rounded-2xl fade-section card-link-departments"
            target="_blank"
            rel="noopener noreferrer"
            title={`Capital: ${capital}`}
            aria-label={`Departamento: ${name}`}
            key={name}
          >
            <div className="w-full rounded-2xl h-full overflow-hidden relative">
              <div className="absolute p-2.5 z-20 bottom-0">
                <h3 className="text-2xl font-extrabold mb-5">{name}</h3>
                <p className="text-sm">{description}</p>
              </div>
              <div className="absolute bg-white/30 dark:bg-black/70  z-10 w-full h-full"></div>
              <Image
                src={image}
                width={200}
                height={300}
                className="w-full card-image-departments h-full rounded-2xl object-cover"
                alt={name}
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

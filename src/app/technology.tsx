"use client";
import Image from "next/image";
import { useEffect } from "react";
export default function Technology() {
    useEffect(() => {
        let lastScrollY = window.scrollY;
        let isScrollingDown = true;
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
      <h1 className="text-6xl font-extrabold mb-10">Tecnologías</h1>
      <div className="grid grid-cols-3 grid-rows-[200px_200px_200px] gap-4">
        <div className="col-span-2 fade-section flex justify-center items-center rounded-2xl relative">
          <div className="absolute bg-white/30 dark:bg-black/70 rounded-2xl z-10 w-full h-full"></div>
          <div className="absolute z-20">
            <h3 className="text-3xl font-extrabold mb-5">CRUD</h3>
            <p className="text-sm">Sistema de reportes</p>
          </div>
          <Image
            src="/img/crud.png"
            className="h-full rounded-2xl w-full object-cover"
            alt="crud-bg-dark"
            width={500}
            height={500}
          />
        </div>
        <div className="row-span-2 fade-section flex justify-center items-center rounded-2xl relative">
          <div className="absolute bg-white/30 dark:bg-black/70 rounded-2xl z-10 w-full h-full"></div>
          <div className="absolute z-20">
            <h3 className="text-3xl font-extrabold text-center mb-5">Pdf</h3>
            <p className="text-sm">descargar pdf de tu reporte</p>
          </div>
          <Image
            src="/img/pdf.png"
            className="h-full rounded-2xl w-full object-cover"
            alt="crud-bg-dark"
            width={500}
            height={500}
          />
        </div>
        <div className="col-span-2 fade-section flex justify-center items-center rounded-2xl relative">
        <div className="absolute bg-white/30 dark:bg-black/70 rounded-2xl z-10 w-full h-full"></div>
          <div className="absolute z-20">
            <h3 className="text-3xl font-extrabold mb-5">Maps | Ubicación</h3>
            <p className="text-sm">Ubicación de reportes</p>
          </div>
          <Image
            src="/img/maps.png"
            className="h-full rounded-2xl w-full object-cover"
            alt="crud-bg-dark"
            width={500}
            height={500}
          />
        </div>
        <div className="col-span-3 fade-section flex justify-center items-center rounded-2xl relative">
        <div className="absolute bg-white/30 dark:bg-black/70 rounded-2xl z-10 w-full h-full"></div>
          <div className="absolute z-20">
            <h3 className="text-3xl font-extrabold mb-5">Llamados a APIs</h3>
            <p className="text-sm">Consumo de APIs</p>
          </div>
          <Image
            src="/img/apis.png"
            className="h-full rounded-2xl w-full object-cover"
            alt="crud-bg-dark"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
}

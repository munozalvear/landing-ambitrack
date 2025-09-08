
import Link from "next/link";

export default function Herologo() {
  return (
    <section className="flex flex-col max-w-4xl mx-auto py-36">
      <h1 className="text-6xl font-extrabold mb-10">Ambi<span>Track</span></h1>
      <h2 className="font-extrabold text-3xl mb-3" >Somo Aprendies del SENA</h2>
      <p className="text-xl">
        este proyecto es realisado para el sprints de SENA para todas la ficha del Cauca
      </p>
      <p className="text-xl">
        que se llevara acavo en el auditorio del <a href="https://maps.app.goo.gl/n8ztB5ueNyQNMtes7" target="_blank" className="font-extrabold underline" >Centro de Comercio y Servicios</a> de popayan
      </p>
      <p className="text-xl">

        saber mas de nuestro proyecto descar Nuestro <a href="/Proyecto_Unificado_AmbiTrack (1) (1).pdf" target="_blank" className="font-extrabold underline" >pdf</a>
      </p>
      <div className="mt-12 flex">
        <Link href="/reports" className="text-[16px] font-extrabold dark:bg-white dark:text-black inline-flex bg-black rounded-full text-white py-1 px-4">
          Reportar
        </Link>
      </div>
    </section>
  );
}
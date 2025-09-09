import Link from "next/link";

export default function Herologo() {
  return (
    <section className="flex flex-col max-w-4xl mx-auto py-36">
      <h1 className="text-7xl font-extrabold mb-10">
        Ambi<span>Track</span>
      </h1>
      <h2 className="font-extrabold text-3xl mb-3">Somo Aprendies del SENA</h2>
      <p className="text-xl">
        Este proyecto ha sido desarrollado especialmente para EL Sprin del
        SENA
      </p>
      <p className="text-xl">
        que se llevara acavo en auditorio del {" "}
        <a
          href="https://maps.app.goo.gl/n8ztB5ueNyQNMtes7"
          target="_blank"
          className="font-extrabold underline"
        >
          Centro de Comercio y Servicios
        </a>{" "}
        en popayan
      </p>
      <p className="text-xl">
      Descargar
      {" "}
        <a
          href="/Proyecto_Unificado_AmbiTrack (1) (1).pdf"
          target="_blank"
          className="font-extrabold underline"
        >
          pdf
        </a>
        {" "}
        del proyecto
      </p>
      <div className="mt-12 flex">
        <Link
          href="/reports"
          className="text-xl font-extrabold dark:bg-white dark:text-black inline-flex bg-black rounded-full text-white py-1 px-4"
        >
          Reportar
        </Link>
      </div>
    </section>
  );
}

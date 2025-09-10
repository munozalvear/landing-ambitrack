"use client";
import { useState, useEffect } from "react";

const Hour = () => {
  const [horaActual, setHoraActual] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const intervalo = setInterval(() => {
      setHoraActual(new Date());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  if (!mounted) return null;

  const formatoHora = horaActual.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return <h3 className="text-3xl lg:text-4xl font-extrabold text-black dark:text-white text-center" title={`hora actual: ${formatoHora}`} >{formatoHora}</h3>;
};

export default Hour;

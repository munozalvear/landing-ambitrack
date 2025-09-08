"use client";
import { useState, useEffect } from 'react';

const Hour = () => {
  const [horaActual, setHoraActual] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHoraActual(new Date());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const formatoHora = horaActual.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <p className='text-7xl' >
        <h3 className='text-7xl font-extrabold' >{formatoHora}</h3>
    </p>
  );
};

export default Hour;
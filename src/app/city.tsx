"use client";

import { useEffect, useState } from 'react';

type Coords = {
  lat: number;
  lon: number;
};

const UbicacionActual = () => {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [ciudad, setCiudad] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lon: longitude });
        },
        (err) => {
          setError('No se pudo obtener la ubicación');
          console.error(err);
        }
      );
    } else {
      setError('Geolocalización no soportada por el navegador');
    }
  }, []);

  useEffect(() => {
    if (coords) {
      const fetchCiudad = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lon}&accept-language=es`
          );
          const data = await response.json();
          console.log('Respuesta de Nominatim:', data); // Depuración
          if (!data.address) {
            setError('No se encontraron resultados para tu ubicación');
            return;
          }
          const location = data.address;
          const nombreCiudad =
            location.city ||
            location.town ||
            location.village ||
            location.hamlet ||
            location.county ||
            location.state ||
            'Ubicación desconocida';
          setCiudad(nombreCiudad);
        } catch (err) {
          console.error('Error al obtener la ciudad:', err);
          setError('No se pudo traducir la ubicación');
        }
      };

      fetchCiudad();
    }
  }, [coords]);

  return (
    <div className="text-center">
      {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}
      {!error && !ciudad && <p className="text-gray-500 dark:text-gray-400 text-sm animate-pulse">Obteniendo ubicación...</p>}
      {ciudad && <h3 className='text-2xl lg:text-3xl font-extrabold text-black dark:text-white text-center' title={`en la ciudad de ${ciudad}`} >{ciudad}</h3>}
    </div>
  );
};

export default UbicacionActual;

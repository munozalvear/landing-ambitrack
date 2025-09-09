'use client';
import { useState } from 'react';

export default function SimpleMap() {
  const [mapUrl, setMapUrl] = useState('');

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        const url = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
        setMapUrl(url);
      }, () => {
        alert('No se pudo obtener tu ubicación');
      });
    } else {
      alert('Tu navegador no soporta geolocalización');
    }
  };

  return (
    <div className="flex flex-col items-center">

      {mapUrl && (
        <div className="mt-4 w-full">
          <iframe
            src={mapUrl}
            width="100%"
            height="400"
            className='rounded-3xl flex mb-7 w-full'
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      )}
      <button onClick={handleClick} className="bg-red-700 text-white px-4 py-2 rounded-2xl cursor-pointer hover:scale-105 transition-all duration-200 ease-linear font-extrabold ">
        Mostrar mi ubicación
      </button>
    </div>
  );
}
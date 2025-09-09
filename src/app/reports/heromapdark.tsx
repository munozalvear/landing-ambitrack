'use client';
import { useState } from 'react';

export default function DarkStyledMap() {
  const [mapUrl, setMapUrl] = useState('');

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const url = `https://www.google.com/maps/embed/v1/view?key=TU_API_KEY&center=${latitude},${longitude}&zoom=15&maptype=roadmap`;
      setMapUrl(url);
    });
  };

  return (
    <div className="bg-white text-black p-6">
      <h2 className="text-xl font-bold mb-4">Ubicación en mapa oscuro</h2>
      <button
        onClick={handleClick}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Mostrar ubicación
      </button>

      {mapUrl && (
        <div className="mt-6 border border-gray-300 rounded overflow-hidden">
          <iframe
            src={mapUrl}
            width="100%"
            height="400"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      )}
    </div>
  );
}
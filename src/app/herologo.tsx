
"use client";
import React, { useEffect, useRef, useState } from "react";

interface SectionProps {
  text: string;
  color: string;
}

function Section({ text, color }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.6 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="h-screen flex items-center justify-center transition-colors duration-500"
    >
      <h2 className={`text-4xl font-bold ${isVisible ? color : "text-gray-400"}`}>
        {text}
      </h2>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Section text="🌱 Sección Ambiental" color="text-green-500" />
      <Section text="📊 Sección de Datos" color="text-blue-500" />
      <Section text="⚙️ Sección Técnica" color="text-orange-500" />
    </div>
  );
}
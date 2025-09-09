"use client";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";

type Reporte = {
  id: number;
  tipo: string;
  zona: string;
  descripcion: string;
  lat: number;
  lng: number;
};

export default function ReportesCrud() {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [form, setForm] = useState({ tipo: "", zona: "", descripcion: "" });
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("reportes");
    if (data) setReportes(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("reportes", JSON.stringify(reportes));
  }, [reportes]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.tipo || !form.zona || !form.descripcion || !coords) return;

    const nuevo: Reporte = {
      id: editId ?? Date.now(),
      tipo: form.tipo,
      zona: form.zona,
      descripcion: form.descripcion,
      lat: coords.lat,
      lng: coords.lng,
    };

    if (editId !== null) {
      setReportes(reportes.map((r) => (r.id === editId ? nuevo : r)));
      setEditId(null);
    } else {
      setReportes([...reportes, nuevo]);
    }

    setForm({ tipo: "", zona: "", descripcion: "" });
  };

  const handleEdit = (id: number) => {
    const r = reportes.find((r) => r.id === id);
    if (r) {
      setForm({ tipo: r.tipo, zona: r.zona, descripcion: r.descripcion });
      setCoords({ lat: r.lat, lng: r.lng });
      setEditId(id);
    }
  };

  const handleDelete = (id: number) => {
    setReportes(reportes.filter((r) => r.id !== id));
  };

  const handleDownload = async (r: Reporte) => {
    const doc = new jsPDF();

    // Paleta de colores moderna
    const colors = {
      primaryGreen: [34, 139, 34] as [number, number, number], // Forest Green
      darkGreen: [0, 100, 0] as [number, number, number], // Dark Green
      lightGreen: [144, 238, 144] as [number, number, number], // Light Green
      black: [0, 0, 0] as [number, number, number], // Pure Black
      darkGray: [64, 64, 64] as [number, number, number], // Dark Gray
      lightGray: [240, 240, 240] as [number, number, number], // Light Gray
      white: [255, 255, 255] as [number, number, number], // White
    };

    try {
      // Fondo degradado moderno - Header principal
      doc.setFillColor(...colors.darkGreen);
      doc.rect(0, 0, 210, 45, "F");

      // Banda decorativa verde claro
      doc.setFillColor(...colors.primaryGreen);
      doc.rect(0, 45, 210, 8, "F");

      // Sombra sutil para el header
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(0, 53, 210, 2, "F");

      // Logo placeholder mejorado
      doc.setFillColor(...colors.white);
      doc.circle(25, 22, 12, "F");
      doc.setFillColor(...colors.primaryGreen);
      doc.circle(25, 22, 8, "F");

      // Icono de hoja en el logo
      doc.setFillColor(...colors.white);
      doc.triangle(25, 18, 22, 26, 28, 26, "F");

      // Título principal moderno
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.setTextColor(...colors.white);
      doc.text("AMBITRACK", 45, 20);

      // Subtítulo
      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.setTextColor(...colors.lightGreen);
      doc.text("Reporte Ambiental", 45, 30);

      // ID del reporte en el header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...colors.white);
      doc.text(`ID: #${r.id}`, 160, 20);

      // Fecha y hora
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const fecha = new Date().toLocaleString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      doc.text(`Generado: ${fecha}`, 160, 30);

      // Sección de información principal
      let yPos = 70;

      // Título de sección
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(...colors.darkGreen);
      doc.text("INFORMACIÓN DEL REPORTE", 15, yPos);

      // Línea decorativa bajo el título
      doc.setDrawColor(...colors.primaryGreen);
      doc.setLineWidth(2);
      doc.line(15, yPos + 3, 195, yPos + 3);

      yPos += 15;

      // Contenedor con bordes redondeados simulados
      doc.setFillColor(...colors.lightGray);
      doc.rect(15, yPos, 180, 80, "F");

      // Borde del contenedor
      doc.setDrawColor(...colors.primaryGreen);
      doc.setLineWidth(1);
      doc.rect(15, yPos, 180, 80, "S");

      yPos += 15;

      // Campos de información con diseño moderno
      const fields = [
        { label: "TIPO DE REPORTE", value: r.tipo, icon: "🏷️" },
        { label: "ZONA AFECTADA", value: r.zona, icon: "📍" },
        { label: "DESCRIPCIÓN", value: r.descripcion, icon: "📝" },
      ];

      fields.forEach((field) => {
        // Etiqueta del campo
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(...colors.darkGray);
        doc.text(`${field.icon} ${field.label}:`, 20, yPos);

        // Valor del campo
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(...colors.black);

        if (field.label === "DESCRIPCIÓN") {
          const splitText = doc.splitTextToSize(field.value, 150);
          doc.text(splitText, 20, yPos + 8);
          yPos += splitText.length * 5 + 10;
        } else {
          doc.text(field.value, 20, yPos + 8);
          yPos += 18;
        }
      });

      // Sección de coordenadas geográficas
      yPos = 170;

      // Fondo para la sección de coordenadas
      doc.setFillColor(...colors.primaryGreen);
      doc.rect(15, yPos, 180, 35, "F");

      // Título de coordenadas
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(...colors.white);
      doc.text("🌍 COORDENADAS GEOGRÁFICAS", 20, yPos + 12);

      // Coordenadas
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(`Latitud: ${r.lat.toFixed(6)}°`, 20, yPos + 22);
      doc.text(`Longitud: ${r.lng.toFixed(6)}°`, 20, yPos + 30);

      // Enlace a Google Maps
      doc.setTextColor(...colors.lightGreen);
      doc.text("📱 Ver en Google Maps", 120, yPos + 26);

      // Footer moderno
      yPos = 220;

      // Línea separadora del footer
      doc.setDrawColor(...colors.primaryGreen);
      doc.setLineWidth(1);
      doc.line(15, yPos, 195, yPos);

      yPos += 10;

      // Información del footer
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...colors.darkGray);
      doc.text("© 2025 AmbiTrack - Sistema de Monitoreo Ambiental", 15, yPos);
      doc.text("landing-ambitrack.vercel.app", 15, yPos + 8);

      // Código QR simulado (placeholder)
      doc.setFillColor(...colors.black);
      doc.rect(170, yPos - 5, 20, 20, "F");
      doc.setFillColor(...colors.white);
      doc.rect(172, yPos - 3, 16, 16, "F");
      doc.setFillColor(...colors.black);
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if ((i + j) % 2 === 0) {
            doc.rect(173 + i * 3.5, yPos - 2 + j * 3.5, 3, 3, "F");
          }
        }
      }

      doc.save(`AmbiTrack_Reporte_${r.id}_${new Date().getTime()}.pdf`);
    } catch (error) {
      console.error("Error al generar el PDF:", error);

      // PDF de respaldo simplificado en caso de error
      doc.setFillColor(...colors.darkGreen);
      doc.rect(0, 0, 210, 30, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(...colors.white);
      doc.text("AMBITRACK - Reporte", 15, 20);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(...colors.black);
      doc.text(`Tipo: ${r.tipo}`, 15, 45);
      doc.text(`Zona: ${r.zona}`, 15, 55);
      doc.text(`Descripción: ${r.descripcion}`, 15, 65);
      doc.text(`Coordenadas: ${r.lat.toFixed(6)}, ${r.lng.toFixed(6)}`, 15, 75);

      doc.save(`AmbiTrack_Reporte_${r.id}.pdf`);
    }
  };

  return (
    <section className="flex flex-col max-w-4xl dark: mx-auto pb-36">
      <h1 className="text-6xl font-extrabold mb-16">Descripción de Reportes</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <select
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
          className="w-full border flex border-black/50 dark:border-white/50 rounded-2xl p-3 [&>option]:bg-transparent "
        >
          <option value="" disabled >Selecciona tipo de reporte</option>
          <option value="Ambiental">Ambiental</option>
          <option value="Infraestructura">Infraestructura</option>
          <option value="Social">Social</option>
        </select>

        <input
          type="text"
          placeholder="Zona donde pasó el reporte"
          value={form.zona}
          onChange={(e) => setForm({ ...form, zona: e.target.value })}
          className="w-full border border-black/50 dark:border-white/50 rounded-2xl p-3 [&>option]:bg-transparent "
        />

        <textarea
          placeholder="Descripción del reporte"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          className="w-full border border-black/50 dark:border-white/50 rounded-2xl p-3 [&>option]:bg-transparent "
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId !== null ? "Actualizar" : "Guardar"}
        </button>
      </form>
      <h1 className="text-6xl font-extrabold my-16">Reportes Guardados</h1>
      <div className="w-full flex flex-col items-center">
        {reportes.length === 0 && (
          <p className="text-gray-500">No hay reportes aún.</p>
        )}

        <ul className="max-w-full w-full gap-5 flex flex-col">
          {reportes.map((r) => (
            <li key={r.id} className="border border-white/50 p-10 rounded-2xl ">
              <div className="flex gap-1 mb-8 flex-col">
                <h5 className="font-extrabold text-2xl">Tipo:</h5>
                <span>{r.tipo}</span>
              </div>
              <div className="flex gap-1 mb-8 flex-col max-w-full w-full break-words whitespace-normal">
                <h5 className="font-extrabold text-2xl">Zona:</h5>
                <span>{r.zona}</span>
              </div>
              <div className="flex gap-1 mb-8 flex-col max-w-full w-full break-words whitespace-normal">
                <h5 className="font-extrabold text-2xl">Descripción:</h5>
                <span>{r.descripcion}</span>
              </div>
              <div className="flex gap-1 mb-8 flex-col">
                <h5 className="font-extrabold text-2xl">Latitud:</h5>
                <span>{r.lat.toFixed(6)}</span>
              </div>
              <div className="flex gap-1 mb-16 flex-col">
                <h5 className="font-extrabold text-2xl">Longitud:</h5>
                <span>{r.lng.toFixed(6)}</span>
              </div>
              <div className="mt-2 w-full flex justify-center gap-9">
                <button
                  onClick={() => handleEdit(r.id)}
                  className="text-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="text-red-600"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleDownload(r)}
                  className="text-green-600"
                >
                  Descargar PDF
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

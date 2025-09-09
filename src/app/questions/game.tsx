"use client";

import React, { useState, useEffect, useCallback } from "react";

interface Opcion {
  id: string;
  texto: string;
}

interface Pregunta {
  id: string;
  texto: string;
  opciones: Opcion[];
  respuestaCorrecta: string;
}

const preguntas: Pregunta[] = [
  {
    id: "1",
    texto:
      "¿Cuál es la acción más efectiva para reducir la cantidad de plásticos en los océanos?",
    opciones: [
      { id: "a", texto: "Reciclar botellas" },
      { id: "b", texto: "Usar bolsas reutilizables" },
      { id: "c", texto: "Reducir el consumo de plásticos de un solo uso" },
      { id: "d", texto: "Quemar los residuos" },
    ],
    respuestaCorrecta: "c",
  },
  {
    id: "2",
    texto:
      "Si ves a alguien realizando tala ilegal en un bosque, ¿qué debes hacer?",
    opciones: [
      { id: "a", texto: "Ignorarlo" },
      { id: "b", texto: "Confrontarlo directamente" },
      {
        id: "c",
        texto:
          "Reportarlo a las autoridades competentes con evidencia si es posible",
      },
      { id: "d", texto: "Tomar un árbol para ti" },
    ],
    respuestaCorrecta: "c",
  },
  {
    id: "3",
    texto: "¿Qué debes hacer primero durante un terremoto?",
    opciones: [
      { id: "a", texto: "Correr hacia la calle" },
      {
        id: "b",
        texto:
          "Protegerte bajo una mesa resistente o junto a un muro estructural",
      },
      { id: "c", texto: "Entrar en un ascensor" },
      { id: "d", texto: "Buscar tu celular" },
    ],
    respuestaCorrecta: "b",
  },
  {
    id: "4",
    texto: "¿Cuál es la principal causa de la deforestación en la Amazonía?",
    opciones: [
      { id: "a", texto: "Urbanización" },
      { id: "b", texto: "Ganadería y agricultura extensiva" },
      { id: "c", texto: "Incendios naturales" },
      { id: "d", texto: "Turismo" },
    ],
    respuestaCorrecta: "b",
  },
  {
    id: "5",
    texto: "En caso de un incendio forestal cercano, lo correcto es:",
    opciones: [
      { id: "a", texto: "Intentar apagarlo con agua por tu cuenta" },
      {
        id: "b",
        texto:
          "Salir rápidamente siguiendo rutas seguras y avisar a emergencias",
      },
      { id: "c", texto: "Esconderte en una cabaña" },
      { id: "d", texto: "Correr en dirección al humo" },
    ],
    respuestaCorrecta: "b",
  },
  {
    id: "6",
    texto: "¿Qué práctica ayuda más a conservar el agua en el hogar?",
    opciones: [
      { id: "a", texto: "Cerrar la llave mientras te cepillas los dientes" },
      { id: "b", texto: "Bañarse en tina todos los días" },
      { id: "c", texto: "Lavar el carro con manguera" },
      { id: "d", texto: "Dejar gotear el grifo" },
    ],
    respuestaCorrecta: "a",
  },
  {
    id: "7",
    texto:
      "Si presencias caza ilegal de animales en peligro de extinción, lo más recomendable es:",
    opciones: [
      { id: "a", texto: "Unirte a la caza" },
      { id: "b", texto: "Huir y no contar nada" },
      {
        id: "c",
        texto: "Reportar el hecho con ubicación y detalles a las autoridades",
      },
      { id: "d", texto: "Tratar de atrapar al cazador por tu cuenta" },
    ],
    respuestaCorrecta: "c",
  },
  {
    id: "8",
    texto: "¿Qué hacer para disminuir la huella de carbono personal?",
    opciones: [
      { id: "a", texto: "Usar transporte público o bicicleta" },
      { id: "b", texto: "Dejar las luces encendidas" },
      { id: "c", texto: "Comprar más productos desechables" },
      { id: "d", texto: "Viajar en avión frecuentemente" },
    ],
    respuestaCorrecta: "a",
  },
  {
    id: "9",
    texto: "Durante una inundación, lo más seguro es:",
    opciones: [
      { id: "a", texto: "Caminar por aguas profundas" },
      {
        id: "b",
        texto: "Buscar refugio en lugares altos y esperar indicaciones",
      },
      { id: "c", texto: "Quedarse dentro del carro en medio del agua" },
      { id: "d", texto: "Intentar nadar hasta tu casa" },
    ],
    respuestaCorrecta: "b",
  },
  {
    id: "10",
    texto: "¿Qué es lo más importante al plantar un árbol?",
    opciones: [
      { id: "a", texto: "Usar especies nativas de la región" },
      { id: "b", texto: "Sembrar cualquier árbol rápido de crecer" },
      { id: "c", texto: "Plantar solo en macetas" },
      { id: "d", texto: "Evitar regarlo" },
    ],
    respuestaCorrecta: "a",
  },
];

const QuizGame: React.FC = () => {
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<
    string | null
  >(null);
  const [finalizado, setFinalizado] = useState(false);
  const [nombre, setNombre] = useState("");
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(30);
  const [juegoIniciado, setJuegoIniciado] = useState(false);

  const manejarRespuesta = (id: string) => {
    if (respuestaSeleccionada !== null) return;

    setRespuestaSeleccionada(id);
    setMostrarRespuesta(true);

    if (id === preguntas[indicePregunta].respuestaCorrecta) {
      setPuntaje((prev) => prev + 1);
    }

    // Auto avanzar después de 2 segundos
    setTimeout(() => {
      siguientePregunta();
    }, 2000);
  };

  const siguientePregunta = useCallback(() => {
    if (indicePregunta + 1 < preguntas.length) {
      setIndicePregunta(indicePregunta + 1);
      setRespuestaSeleccionada(null);
      setMostrarRespuesta(false);
      setTiempoRestante(30);
    } else {
      setFinalizado(true);
    }
  }, [indicePregunta]);

  const reiniciarJuego = () => {
    setIndicePregunta(0);
    setPuntaje(0);
    setRespuestaSeleccionada(null);
    setFinalizado(false);
    setMostrarRespuesta(false);
    setTiempoRestante(30);
    setJuegoIniciado(false);
  };

  const iniciarJuego = () => {
    if (nombre.trim()) {
      setJuegoIniciado(true);
      setTiempoRestante(30);
    }
  };


  const obtenerPorcentajePuntaje = () => {
    return Math.round((puntaje / preguntas.length) * 100);
  };

  // Timer effect
  useEffect(() => {
    if (
      juegoIniciado &&
      !finalizado &&
      !mostrarRespuesta &&
      tiempoRestante > 0
    ) {
      const timer = setTimeout(() => {
        setTiempoRestante((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (tiempoRestante === 0 && !mostrarRespuesta) {
      // Tiempo agotado, marcar como incorrecta
      setMostrarRespuesta(true);
      setTimeout(() => {
        siguientePregunta();
      }, 2000);
    }
  }, [
    juegoIniciado,
    finalizado,
    mostrarRespuesta,
    tiempoRestante,
    siguientePregunta,
  ]);

  if (!juegoIniciado) {
    return (
      <div className={`min-h-screen flex items-center rounded-3xl justify-center p-4`}>
        <div className={`rounded-2xl shadow-2xl p-8 max-w-md w-full border`}>
          <div className="text-center mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">🌱 EcoQuiz</h1>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">¡Bienvenido al Quiz Ambiental!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Pon a prueba tus conocimientos sobre medio ambiente y sostenibilidad
            </p>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingresa tu nombre"
              onKeyPress={(e) => e.key === "Enter" && iniciarJuego()}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
            />
            <button
              onClick={iniciarJuego}
              disabled={!nombre.trim()}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
            >
              Comenzar Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-4xl max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 my-20 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">🌱 EcoQuiz</h1>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full">
            <span className="text-blue-600 dark:text-blue-300 font-medium">👤</span>
            <span className="text-blue-800 dark:text-blue-200 font-semibold" id="nombre">
              {nombre}
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900 px-4 py-2 rounded-full">
            <span className="text-green-600 dark:text-green-300 font-medium">⭐</span>
            <span className="text-green-800 dark:text-green-200 font-bold text-xl" id="puntos">
              {puntaje}
            </span>
          </div>
        </header>

      <main className="juego">
          {finalizado ? (
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">🎉 ¡Quiz Completado!</h2>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl mb-6 shadow-lg">
                <div className="text-2xl font-bold mb-2">
                  {puntaje} de {preguntas.length} respuestas correctas
                </div>
                <div className="text-lg">Porcentaje de aciertos: {obtenerPorcentajePuntaje()}%</div>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                {obtenerPorcentajePuntaje() >= 80
                  ? "🌟 ¡Excelente! Eres un experto en temas ambientales."
                  : obtenerPorcentajePuntaje() >= 60
                  ? "👍 ¡Bien hecho! Tienes buenos conocimientos ambientales."
                  : "📚 Sigue aprendiendo sobre el cuidado del medio ambiente."}
              </p>
              <button 
                onClick={reiniciarJuego}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                🔄 Jugar de nuevo
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${((indicePregunta + 1) / preguntas.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full font-bold">
                      {String(indicePregunta + 1).padStart(2, "0")}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">de {preguntas.length}</span>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                    tiempoRestante <= 10 
                      ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300' 
                      : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                  }`}>
                    <span>⏰</span>
                    <span className="font-bold">{tiempoRestante}s</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 leading-relaxed">
                {preguntas[indicePregunta].texto}
              </h3>

              <div className="grid grid-cols-1 gap-4 mb-8">
                {preguntas[indicePregunta].opciones.map((opcion, index) => {
                  const letter = String.fromCharCode(65 + index);
                  const isSelected = respuestaSeleccionada === opcion.id;
                  const isCorrect = opcion.id === preguntas[indicePregunta].respuestaCorrecta;
                  const isIncorrect = mostrarRespuesta && isSelected && !isCorrect;
                  
                  return (
                    <button
                      key={opcion.id}
                      className={`flex items-center p-4 text-left border-2 rounded-xl transition-all duration-300 hover:shadow-lg ${
                        !mostrarRespuesta
                          ? isSelected
                            ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 dark:border-blue-400 shadow-md'
                            : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                          : isCorrect
                          ? 'bg-green-100 dark:bg-green-900 border-green-500 dark:border-green-400'
                          : isIncorrect
                          ? 'bg-red-100 dark:bg-red-900 border-red-500 dark:border-red-400'
                          : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                      } ${mostrarRespuesta || tiempoRestante === 0 ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                      onClick={() => manejarRespuesta(opcion.id)}
                      disabled={mostrarRespuesta || tiempoRestante === 0}
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mr-4 ${
                        !mostrarRespuesta
                          ? isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                          : isCorrect
                          ? 'bg-green-500 text-white'
                          : isIncorrect
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}>
                        {letter}
                      </div>
                      <span className="flex-1 text-gray-800 dark:text-gray-200 font-medium">{opcion.texto}</span>
                      {mostrarRespuesta && isCorrect && (
                        <span className="text-green-600 dark:text-green-400 font-bold ml-2 text-xl">✓</span>
                      )}
                      {isIncorrect && (
                        <span className="text-red-600 dark:text-red-400 font-bold ml-2 text-xl">✗</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {!mostrarRespuesta && (
                <div className="text-center">
                  <button
                    onClick={siguientePregunta}
                    disabled={respuestaSeleccionada === null}
                    className={`px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg ${
                      respuestaSeleccionada === null ? 'opacity-50' : 'opacity-100'
                    }`}
                  >
                    {indicePregunta + 1 === preguntas.length
                      ? "🏁 Finalizar"
                      : "➡️ Siguiente"}
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default QuizGame;
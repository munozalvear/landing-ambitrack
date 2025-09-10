"use client";
import { useState, useEffect, useCallback } from "react";

interface Position {
  x: number;
  y: number;
}

interface Ghost {
  id: number;
  x: number;
  y: number;
  color: string;
  direction: string;
}

const BOARD_WIDTH = 19;
const BOARD_HEIGHT = 13;
const CELL_SIZE = 25;

// Simple maze layout (1 = wall, 0 = empty, 2 = dot)
const MAZE = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,0,1,0,1,1,1,2,1,1,1,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];


const INITIAL_GHOSTS: Ghost[] = [
  { id: 1, x: 8, y: 6, color: 'bg-red-500', direction: 'UP' },
  { id: 2, x: 10, y: 6, color: 'bg-pink-500', direction: 'DOWN' },
  { id: 3, x: 9, y: 5, color: 'bg-cyan-500', direction: 'LEFT' },
  { id: 4, x: 9, y: 7, color: 'bg-orange-500', direction: 'RIGHT' },
];

export default function PacManGame() {
  const [pacmanPos, setPacmanPos] = useState<Position>({ x: 9, y: 6 });
  const [direction, setDirection] = useState<string>('');
  const [maze, setMaze] = useState(MAZE.map(row => [...row]));
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [ghosts, setGhosts] = useState<Ghost[]>(INITIAL_GHOSTS);
  const [gameOver, setGameOver] = useState(false);
  const [lives, setLives] = useState(3);
  const [invulnerable, setInvulnerable] = useState(false);


  // Check collision between Pac-Man and ghosts
  const checkCollisions = useCallback(() => {
    if (!gameStarted || gameOver || invulnerable) return;

    const collision = ghosts.some(ghost => 
      ghost.x === pacmanPos.x && ghost.y === pacmanPos.y
    );

    if (collision) {
      setInvulnerable(true);
      setLives(prevLives => {
        const newLives = prevLives - 1;
        if (newLives <= 0) {
          setGameOver(true);
          setGameStarted(false);
        } else {
          // Reset Pac-Man position and make invulnerable for 2 seconds
          setPacmanPos({ x: 1, y: 1 });
          setGhosts(INITIAL_GHOSTS);
          setTimeout(() => {
            setInvulnerable(false);
          }, 2000);
        }
        return newLives;
      });
    }
  }, [ghosts, pacmanPos, gameStarted, gameOver, invulnerable]);

  const movePacman = useCallback((newDirection: string) => {
    if (!gameStarted || gameOver) return;
    
    setPacmanPos(prevPos => {
      let newX = prevPos.x;
      let newY = prevPos.y;

      switch (newDirection) {
        case 'UP':
          newY = Math.max(0, prevPos.y - 1);
          break;
        case 'DOWN':
          newY = Math.min(BOARD_HEIGHT - 1, prevPos.y + 1);
          break;
        case 'LEFT':
          newX = Math.max(0, prevPos.x - 1);
          break;
        case 'RIGHT':
          newX = Math.min(BOARD_WIDTH - 1, prevPos.x + 1);
          break;
      }

      // Check if new position is valid (not a wall)
      if (maze[newY][newX] === 1) {
        return prevPos; // Don't move if hitting a wall
      }

      // Check if there's a dot to collect
      if (maze[newY][newX] === 2) {
        setMaze(prevMaze => {
          const newMaze = prevMaze.map(row => [...row]);
          newMaze[newY][newX] = 0; // Remove the dot
          return newMaze;
        });
        setScore(prevScore => prevScore + 10);
      }

      return { x: newX, y: newY };
    });
  }, [maze, gameStarted, gameOver]);

  // Ghost movement timer
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const ghostTimer = setInterval(() => {
      setGhosts(prevGhosts => 
        prevGhosts.map(ghost => {
          const directions = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
          let newX = ghost.x;
          let newY = ghost.y;
          let newDirection = ghost.direction;

          // Try to move in current direction first
          switch (ghost.direction) {
            case 'UP':
              newY = Math.max(0, ghost.y - 1);
              break;
            case 'DOWN':
              newY = Math.min(BOARD_HEIGHT - 1, ghost.y + 1);
              break;
            case 'LEFT':
              newX = Math.max(0, ghost.x - 1);
              break;
            case 'RIGHT':
              newX = Math.min(BOARD_WIDTH - 1, ghost.x + 1);
              break;
          }

          // Check if new position is valid (not a wall)
          if (MAZE[newY][newX] === 1) {
            const validDirections = directions.filter(dir => {
              let testX = ghost.x;
              let testY = ghost.y;
              
              switch (dir) {
                case 'UP':
                  testY = Math.max(0, ghost.y - 1);
                  break;
                case 'DOWN':
                  testY = Math.min(BOARD_HEIGHT - 1, ghost.y + 1);
                  break;
                case 'LEFT':
                  testX = Math.max(0, ghost.x - 1);
                  break;
                case 'RIGHT':
                  testX = Math.min(BOARD_WIDTH - 1, ghost.x + 1);
                  break;
              }
              
              return MAZE[testY][testX] !== 1;
            });

            if (validDirections.length > 0) {
              newDirection = validDirections[Math.floor(Math.random() * validDirections.length)];
              
              switch (newDirection) {
                case 'UP':
                  newY = Math.max(0, ghost.y - 1);
                  newX = ghost.x;
                  break;
                case 'DOWN':
                  newY = Math.min(BOARD_HEIGHT - 1, ghost.y + 1);
                  newX = ghost.x;
                  break;
                case 'LEFT':
                  newX = Math.max(0, ghost.x - 1);
                  newY = ghost.y;
                  break;
                case 'RIGHT':
                  newX = Math.min(BOARD_WIDTH - 1, ghost.x + 1);
                  newY = ghost.y;
                  break;
              }
            } else {
              newX = ghost.x;
              newY = ghost.y;
            }
          }

          return { ...ghost, x: newX, y: newY, direction: newDirection };
        })
      );
    }, 500); // Move ghosts every 500ms

    return () => clearInterval(ghostTimer);
  }, [gameStarted, gameOver]);

  // Collision detection
  useEffect(() => {
    checkCollisions();
  }, [checkCollisions, pacmanPos]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          setDirection('UP');
          movePacman('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          setDirection('DOWN');
          movePacman('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          setDirection('LEFT');
          movePacman('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          setDirection('RIGHT');
          movePacman('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePacman]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLives(3);
    setInvulnerable(false);
    setPacmanPos({ x: 9, y: 6 });
    setMaze(MAZE.map(row => [...row]));
    setGhosts(INITIAL_GHOSTS);
    setDirection('');
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setLives(3);
    setInvulnerable(false);
    setPacmanPos({ x: 9, y: 6 });
    setMaze(MAZE.map(row => [...row]));
    setGhosts(INITIAL_GHOSTS);
    setDirection('');
  };

  return (
    <div>
      <section className="flex flex-col max-w-4xl mx-auto py-16">
        <h1 className="text-6xl font-extrabold mb-8 text-center">Pac-Man</h1>
        
        {/* Game Info */}
        <div className="bg-white dark:bg-gray-800 border border-black/50 dark:border-white/50 rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-6 items-center">
              <div className="text-2xl font-bold">
                Puntuación: <span className="text-yellow-500">{score}</span>
              </div>
              <div className="text-2xl font-bold">
                Vidas: <span className="text-red-500">{'❤️'.repeat(lives)}</span>
              </div>
            </div>
            <div className="flex gap-4">
              {gameOver ? (
                <div className="flex gap-4 items-center">
                  <span className="text-red-500 font-bold text-xl">¡Game Over!</span>
                  <button
                    onClick={resetGame}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Jugar de Nuevo
                  </button>
                </div>
              ) : !gameStarted ? (
                <button
                  onClick={startGame}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Iniciar Juego
                </button>
              ) : (
                <button
                  onClick={resetGame}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Reiniciar
                </button>
              )}
            </div>
          </div>
          
          {/* Controls */}
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <p>Controles: Usa las flechas del teclado o WASD para mover a Pac-Man</p>
          </div>
        </div>

        {/* Game Board */}
        <div className="flex justify-center">
          <div 
            className="relative bg-black border-4 border-blue-600 dark:border-blue-400 rounded-lg p-4"
            style={{
              width: BOARD_WIDTH * CELL_SIZE + 32,
              height: BOARD_HEIGHT * CELL_SIZE + 32,
            }}
          >
            {/* Maze */}
            {maze.map((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className={`absolute ${
                    cell === 1 
                      ? 'bg-blue-600 dark:bg-blue-500' 
                      : cell === 2 
                      ? 'bg-yellow-300' 
                      : 'bg-transparent'
                  }`}
                  style={{
                    left: x * CELL_SIZE + 16,
                    top: y * CELL_SIZE + 16,
                    width: cell === 2 ? 4 : CELL_SIZE,
                    height: cell === 2 ? 4 : CELL_SIZE,
                    borderRadius: cell === 2 ? '50%' : '2px',
                    transform: cell === 2 ? 'translate(10px, 10px)' : 'none',
                  }}
                />
              ))
            )}

            {/* Ghosts */}
            {ghosts.map(ghost => (
              <div
                key={ghost.id}
                className={`absolute ${ghost.color} rounded-t-full transition-all duration-300 flex items-center justify-center text-lg shadow-lg`}
                style={{
                  left: ghost.x * CELL_SIZE + 16,
                  top: ghost.y * CELL_SIZE + 16,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  borderBottomLeftRadius: '0px',
                  borderBottomRightRadius: '0px',
                }}
              >
                <span className="text-white font-bold text-sm">👻</span>
              </div>
            ))}

            {/* Pac-Man */}
            <div
              className={`absolute rounded-full transition-all duration-150 flex items-center justify-center text-lg z-10 ${
                invulnerable ? 'bg-yellow-200 opacity-50 animate-pulse' : 'bg-yellow-400'
              }`}
              style={{
                left: pacmanPos.x * CELL_SIZE + 16,
                top: pacmanPos.y * CELL_SIZE + 16,
                width: CELL_SIZE,
                height: CELL_SIZE,
                transform: `rotate(${
                  direction === 'RIGHT' ? '0deg' :
                  direction === 'DOWN' ? '90deg' :
                  direction === 'LEFT' ? '180deg' :
                  direction === 'UP' ? '270deg' : '0deg'
                })`,
              }}
            >
              <span className="text-black font-bold">◐</span>
            </div>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex justify-center mt-8 md:hidden">
          <div className="grid grid-cols-3 gap-2">
            <div></div>
            <button
              onClick={() => movePacman('UP')}
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-bold text-xl"
            >
              ↑
            </button>
            <div></div>
            <button
              onClick={() => movePacman('LEFT')}
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-bold text-xl"
            >
              ←
            </button>
            <div></div>
            <button
              onClick={() => movePacman('RIGHT')}
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-bold text-xl"
            >
              →
            </button>
            <div></div>
            <button
              onClick={() => movePacman('DOWN')}
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-bold text-xl"
            >
              ↓
            </button>
            <div></div>
          </div>
        </div>

        {/* Game Stats */}
        <div className="mt-8 text-center text-gray-600 dark:text-gray-300">
          <p>¡Recoge todos los puntos amarillos para ganar puntos!</p>
          <p className="text-sm mt-2">Juego creado para AmbiTrack</p>
        </div>
      </section>
    </div>
  );
}
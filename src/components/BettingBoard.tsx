import type { Bet, SpecialBet } from '../types/roulette.types';
import { getNumberColorClass } from '../utils/roulette.utils';
// Componente: Tablero de Apuestas
export const BettingBoard: React.FC<{
  bets: Bet;
  specialBets: SpecialBet;
  onBet: (number: number) => void;
  onSpecialBet: (type: 'red' | 'black' | 'even' | 'odd') => void;
}> = ({ bets, specialBets, onBet, onSpecialBet }) => {
  // Disposición real del casino - 3 filas
  const row1 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]; // Arriba
  const row2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]; // Medio
  const row3 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]; // Abajo

  return (
    <div className="bg-green-800 p-4 rounded-lg">
      {/* Apuestas Especiales */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <button
          onClick={() => onSpecialBet('red')}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded relative transition"
        >
          ROJO
          {specialBets.red && specialBets.red > 0 && (
            <span className="absolute top-1 right-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded">
              ${specialBets.red}
            </span>
          )}
        </button>
        <button
          onClick={() => onSpecialBet('black')}
          className="bg-gray-900 hover:bg-black text-white font-bold py-3 rounded relative transition"
        >
          NEGRO
          {specialBets.black && specialBets.black > 0 && (
            <span className="absolute top-1 right-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded">
              ${specialBets.black}
            </span>
          )}
        </button>
        <button
          onClick={() => onSpecialBet('even')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded relative transition"
        >
          PAR
          {specialBets.even && specialBets.even > 0 && (
            <span className="absolute top-1 right-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded">
              ${specialBets.even}
            </span>
          )}
        </button>
        <button
          onClick={() => onSpecialBet('odd')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded relative transition"
        >
          IMPAR
          {specialBets.odd && specialBets.odd > 0 && (
            <span className="absolute top-1 right-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded">
              ${specialBets.odd}
            </span>
          )}
        </button>
      </div>

      {/* Tablero estilo casino real */}
      <div className="flex gap-1">
        {/* Número 0 a la izquierda */}
        <div className="flex items-stretch">
          <button
            onClick={() => onBet(0)}
            className={`${getNumberColorClass(
              0
            )} text-white font-bold px-4 rounded relative transition w-16`}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-2xl">0</span>
            </div>
            {bets[0] > 0 && (
              <span className="absolute top-1 right-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded">
                ${bets[0]}
              </span>
            )}
          </button>
        </div>

        {/* Columnas de números */}
        <div className="flex-1">
          {/* Fila 1 (3, 6, 9...) */}
          <div className="grid grid-cols-12 gap-1 mb-1">
            {row1.map((num) => (
              <button
                key={num}
                onClick={() => onBet(num)}
                className={`${getNumberColorClass(
                  num
                )} text-white text-sm font-bold py-3 rounded relative transition`}
              >
                {num}
                {bets[num] > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs px-1 rounded">
                    ${bets[num]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Fila 2 (2, 5, 8...) */}
          <div className="grid grid-cols-12 gap-1 mb-1">
            {row2.map((num) => (
              <button
                key={num}
                onClick={() => onBet(num)}
                className={`${getNumberColorClass(
                  num
                )} text-white text-sm font-bold py-3 rounded relative transition`}
              >
                {num}
                {bets[num] > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs px-1 rounded">
                    ${bets[num]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Fila 3 (1, 4, 7...) */}
          <div className="grid grid-cols-12 gap-1">
            {row3.map((num) => (
              <button
                key={num}
                onClick={() => onBet(num)}
                className={`${getNumberColorClass(
                  num
                )} text-white text-sm font-bold py-3 rounded relative transition`}
              >
                {num}
                {bets[num] > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs px-1 rounded">
                    ${bets[num]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

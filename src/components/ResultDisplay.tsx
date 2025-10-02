import { getNumberTextColor } from '../utils/roulette.utils';

export const ResultDisplay: React.FC<{
  result: number | null;
  won: boolean;
  winAmount: number;
}> = ({ result, won, winAmount }) => {
  if (result === null) return null;

  return (
    <div
      className={`mt-4 p-4 rounded-lg text-center ${
        won ? 'bg-green-100' : 'bg-red-100'
      }`}
    >
      <div className="text-2xl font-bold mb-2">
        Resultado: <span className={getNumberTextColor(result)}>{result}</span>
      </div>
      {won ? (
        <div className="text-green-700 font-bold text-xl">
          ¡Ganaste ${winAmount.toLocaleString()}!
        </div>
      ) : (
        <div className="text-red-700 font-bold">Perdiste esta ronda</div>
      )}
    </div>
  );
};

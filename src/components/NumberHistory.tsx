import { getNumberColor } from '../utils/roulette.utils';

// Componente: Historial de Números
export const NumberHistory: React.FC<{ history: number[] }> = ({ history }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <h3 className="text-white text-sm font-semibold mb-2 text-center">
        Historial
      </h3>
      <div
        className="flex gap-2 overflow-x-auto pb-2"
        style={{ scrollbarWidth: 'thin' }}
      >
        {history.length === 0 ? (
          <p className="text-gray-400 text-sm text-center w-full">
            No hay tiradas aún
          </p>
        ) : (
          history.map((num, index) => {
            const color = getNumberColor(num);
            const bgColor =
              color === 'red'
                ? 'bg-red-600'
                : color === 'black'
                ? 'bg-gray-900'
                : 'bg-green-600';
            return (
              <div
                key={index}
                className={`${bgColor} text-white font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 shadow-lg`}
              >
                {num}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

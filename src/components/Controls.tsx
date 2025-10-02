export const Controls: React.FC<{
  onSpin: () => void;
  onClear: () => void;
  spinning: boolean;
  canSpin: boolean;
}> = ({ onSpin, onClear, spinning, canSpin }) => {
  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={onSpin}
        disabled={spinning || !canSpin}
        className={`flex-1 ${
          spinning || !canSpin
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'
        } text-white font-bold py-3 rounded-lg transition`}
      >
        {spinning ? 'Girando...' : 'Girar Ruleta'}
      </button>
      <button
        onClick={onClear}
        disabled={spinning}
        className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
      >
        Limpiar Apuestas
      </button>
    </div>
  );
};

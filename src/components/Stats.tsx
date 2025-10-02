export const Stats: React.FC<{
  balance: number;
  betAmount: number;
  onBetChange: (amount: number) => void;
  totalBet: number;
}> = ({ balance, betAmount, onBetChange, totalBet }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg mb-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-sm text-gray-400">Balance</div>
          <div className="text-xl font-bold">${balance.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-400">Apostado</div>
          <div className="text-xl font-bold text-yellow-400">
            ${totalBet.toLocaleString()}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-400">Disponible</div>
          <div className="text-xl font-bold text-green-400">
            ${(balance - totalBet).toLocaleString()}
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Monto por ficha (ARS)
        </label>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => onBetChange(parseFloat(e.target.value) || 0)}
          className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          min="1"
        />
      </div>
    </div>
  );
};

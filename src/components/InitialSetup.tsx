import React, { useState } from 'react';

export const InitialSetup: React.FC<{ onStart: (capital: number) => void }> = ({
  onStart,
}) => {
  const [capital, setCapital] = useState('1000000');

  const handleStart = () => {
    const amount = parseFloat(capital);
    if (amount > 0) {
      onStart(amount);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-800">
          Ruleta Argentina
        </h1>
        <p className="text-center text-gray-600 mb-6">37 números (0-36)</p>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Capital Inicial (ARS)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">$</span>
            <input
              type="number"
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              placeholder="10000"
              min="1"
            />
          </div>
        </div>
        <button
          onClick={handleStart}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
        >
          Comenzar
        </button>
      </div>
    </div>
  );
};

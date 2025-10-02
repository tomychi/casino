import {
  NUMBER_COLORS,
  ROULETTE_NUMBERS,
} from '../constants/roulette.constants';
import type { Bet, SpecialBet } from '../types/roulette.types';

const getNumberColor = (num: number): 'red' | 'black' | 'green' => {
  return NUMBER_COLORS[num] || 'black';
};

const getNumberColorClass = (num: number): string => {
  const color = getNumberColor(num);
  if (color === 'red') return 'bg-red-600 hover:bg-red-700';
  if (color === 'black') return 'bg-gray-900 hover:bg-black';
  return 'bg-green-600 hover:bg-green-700';
};

const getNumberTextColor = (num: number): string => {
  const color = getNumberColor(num);
  if (color === 'red') return 'text-red-600';
  if (color === 'black') return 'text-black';
  return 'text-green-600';
};

const spinRoulette = (): number => {
  return ROULETTE_NUMBERS[Math.floor(Math.random() * ROULETTE_NUMBERS.length)];
};

const calculatePayout = (
  bets: Bet,
  specialBets: SpecialBet,
  winningNumber: number,
  multiplier: number
): number => {
  let totalPayout = 0;

  // Pago por número pleno
  if (bets[winningNumber]) {
    totalPayout += bets[winningNumber] * multiplier;
  }

  // Pago por apuestas especiales (pagan 2:1)
  if (winningNumber !== 0) {
    const color = getNumberColor(winningNumber);
    const isEven = winningNumber % 2 === 0;

    if (color === 'red' && specialBets.red) {
      totalPayout += specialBets.red * 2;
    }
    if (color === 'black' && specialBets.black) {
      totalPayout += specialBets.black * 2;
    }
    if (isEven && specialBets.even) {
      totalPayout += specialBets.even * 2;
    }
    if (!isEven && specialBets.odd) {
      totalPayout += specialBets.odd * 2;
    }
  }

  return totalPayout;
};

export {
  getNumberColor,
  getNumberColorClass,
  getNumberTextColor,
  spinRoulette,
  calculatePayout,
};

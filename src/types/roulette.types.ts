export interface Bet {
  [key: number]: number;
}

export interface GameState {
  balance: number;
  betAmount: number;
  bets: Bet;
  spinning: boolean;
  result: number | null;
  won: boolean;
  winAmount: number;
}
export interface SpecialBet {
  red?: number;
  black?: number;
  even?: number;
  odd?: number;
}

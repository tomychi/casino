import { useState, useEffect } from 'react';
import type { Bet, SpecialBet } from './types/roulette.types';
import { calculatePayout, spinRoulette } from './utils/roulette.utils';
import {
  PAYOUT_MULTIPLIER,
  SPIN_DURATION,
} from './constants/roulette.constants';
import { InitialSetup } from './components/InitialSetup';
import { Stats } from './components/Stats';
import { ResultDisplay } from './components/ResultDisplay';
import { BettingBoard } from './components/BettingBoard';
import { Controls } from './components/Controls';
import { NumberHistory } from './components/NumberHistory';
import {
  getTodaySession,
  createTodaySession,
  updateSessionAfterSpin,
} from './services/casino.service';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [betAmount, setBetAmount] = useState(10000);
  const [bets, setBets] = useState<Bet>({});
  const [specialBets, setSpecialBets] = useState<SpecialBet>({});
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [won, setWon] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const [history, setHistory] = useState<number[]>([]);

  // Cargar sesión al iniciar
  useEffect(() => {
    const loadSession = async () => {
      setLoading(true);
      const session = await getTodaySession();

      if (session) {
        setBalance(session.balance);
        setHistory(session.numbersHistory);
        setGameStarted(true);
      }

      setLoading(false);
    };

    loadSession();
  }, []);

  const totalBet =
    Object.values(bets).reduce((sum, bet) => sum + bet, 0) +
    Object.values(specialBets).reduce((sum, bet) => sum + (bet || 0), 0);

  const handleStart = async (capital: number) => {
    try {
      await createTodaySession(capital);
      setBalance(capital);
      setGameStarted(true);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al guardar la sesión en la base de datos');
    }
  };

  const handleBet = (number: number) => {
    if (spinning) return;
    if (balance - totalBet < betAmount) return;

    setBets((prev) => ({
      ...prev,
      [number]: (prev[number] || 0) + betAmount,
    }));
  };

  const handleSpecialBet = (type: 'red' | 'black' | 'even' | 'odd') => {
    if (spinning) return;
    if (balance - totalBet < betAmount) return;

    setSpecialBets((prev) => ({
      ...prev,
      [type]: (prev[type] || 0) + betAmount,
    }));
  };

  const handleClear = () => {
    setBets({});
    setSpecialBets({});
    setResult(null);
  };

  const handleSpin = () => {
    if (totalBet === 0) return;

    // PRIMERO generamos el número ganador
    const winningNumber = spinRoulette();

    setSpinning(true);
    setResult(winningNumber); // Esto activa la animación de la ruleta

    const balanceAfterBet = balance - totalBet;
    setBalance(balanceAfterBet);

    setTimeout(async () => {
      // Después de 9 segundos (cuando termina la animación)
      setHistory((prev) => [winningNumber, ...prev].slice(0, 20));

      const payout = calculatePayout(
        bets,
        specialBets,
        winningNumber,
        PAYOUT_MULTIPLIER
      );

      const finalBalance = balanceAfterBet + payout;
      setBalance(finalBalance);

      // Guardar en Firebase
      try {
        await updateSessionAfterSpin(finalBalance, winningNumber);
      } catch (error) {
        console.error('Error al guardar en Firebase:', error);
      }

      if (payout > 0) {
        setWon(true);
        setWinAmount(payout - totalBet);
      } else {
        setWon(false);
        setWinAmount(0);
      }

      setSpinning(false);
      setBets({});
      setSpecialBets({});
    }, SPIN_DURATION); // Cambiá de SPIN_DURATION a 9000 para que coincida con la animación
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center">
        <div className="text-white text-2xl">Cargando sesión...</div>
      </div>
    );
  }

  if (!gameStarted) {
    return <InitialSetup onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Ruleta Argentina
        </h1>
        <p className="text-white text-center mb-6 opacity-80">
          37 números (0-36) • Paga 36:1
        </p>

        <Stats
          balance={balance}
          betAmount={betAmount}
          onBetChange={setBetAmount}
          totalBet={totalBet}
        />

        <NumberHistory history={history} />

        <ResultDisplay result={result} won={won} winAmount={winAmount} />

        <BettingBoard
          bets={bets}
          specialBets={specialBets}
          onBet={handleBet}
          onSpecialBet={handleSpecialBet}
        />

        <Controls
          onSpin={handleSpin}
          onClear={handleClear}
          spinning={spinning}
          canSpin={totalBet > 0 && !spinning}
        />
      </div>
    </div>
  );
}

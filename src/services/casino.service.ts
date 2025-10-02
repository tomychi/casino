import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase.config';

export interface CasinoSession {
  date: string;
  balance: number;
  numbersHistory: number[];
  lastUpdated: Timestamp;
}

// Obtener la fecha actual en formato YYYY-MM-DD
const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Crear o obtener la sesión del día
export const getTodaySession = async (): Promise<CasinoSession | null> => {
  const todayDate = getTodayDate();
  const docRef = doc(db, 'casino', todayDate);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as CasinoSession;
    }

    return null;
  } catch (error) {
    console.error('Error al obtener sesión:', error);
    return null;
  }
};

// Crear nueva sesión del día con capital inicial
export const createTodaySession = async (
  initialBalance: number
): Promise<void> => {
  const todayDate = getTodayDate();
  const docRef = doc(db, 'casino', todayDate);

  try {
    await setDoc(docRef, {
      date: todayDate,
      balance: initialBalance,
      numbersHistory: [],
      lastUpdated: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error al crear sesión:', error);
    throw error;
  }
};

// Actualizar balance
export const updateBalance = async (newBalance: number): Promise<void> => {
  const todayDate = getTodayDate();
  const docRef = doc(db, 'casino', todayDate);

  try {
    await updateDoc(docRef, {
      balance: newBalance,
      lastUpdated: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error al actualizar balance:', error);
    throw error;
  }
};

// Agregar número al historial
export const addNumberToHistory = async (number: number): Promise<void> => {
  const todayDate = getTodayDate();
  const docRef = doc(db, 'casino', todayDate);

  try {
    await updateDoc(docRef, {
      numbersHistory: arrayUnion(number),
      lastUpdated: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error al agregar número:', error);
    throw error;
  }
};

// Actualizar balance y agregar número en una sola operación
export const updateSessionAfterSpin = async (
  newBalance: number,
  winningNumber: number
): Promise<void> => {
  const todayDate = getTodayDate();
  const docRef = doc(db, 'casino', todayDate);

  try {
    await updateDoc(docRef, {
      balance: newBalance,
      numbersHistory: arrayUnion(winningNumber),
      lastUpdated: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error al actualizar sesión:', error);
    throw error;
  }
};

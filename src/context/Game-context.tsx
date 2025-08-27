import { createContext, useState, useContext, useMemo, useCallback } from 'react';
import {calculateWinner} from '../utils/Game-utils';
import {
  GameContextType,
  HistoryItem,
  SquareValue,
  GameProviderProps,
} from '../types/types';


const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({children}: GameProviderProps) {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      squares: Array(9).fill(null) as SquareValue[],
      lastPosition: null,
    },
  ]);

  const [currentMove, setCurrentMove] = useState(0);
  const [lastMove, setLastMove] = useState<number | null>(null);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  const {winner, line} = useMemo(() => calculateWinner(currentSquares), [currentSquares]);

  const handlePlay = useCallback(
      (nextSquares: SquareValue[], position: number) => {
      // Удаление ходов при перемотке игры назад
      const nextHistory = [
        ...history.slice(0, currentMove + 1),
        {
          squares: nextSquares,
          lastPosition: position,
        },
      ];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
      setLastMove(position);
    },
    [history, currentMove]
  );

  const jumpTo = useCallback(
      (nextMove: number) => {
      setCurrentMove(nextMove);
      setLastMove(history[nextMove].lastPosition);
    },
    [history]
  );

  const resetGame = useCallback(() => {
    setHistory([
      {
        squares: Array(9).fill(null) as SquareValue[],
        lastPosition: null,
      },
    ]);
    setCurrentMove(0);
    setLastMove(null);
  }, []);

  // Значения, которые будут доступны через контекст
  const value = {
    history,
    currentMove,
    lastMove,
    xIsNext,
    currentSquares,
    winner,
    line,
    handlePlay,
    jumpTo,
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (context === null) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}

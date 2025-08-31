import React from 'react';

export type TSquareValue = 'X' | 'O' | null;

export type TGameResult = 'X' | 'O' | 'Draw' | null;

//  интерфейс для истории ходов
export interface IHistoryItem {
  squares: TSquareValue[];
  lastPosition: number | null;
}

export interface IWinnerResult {
  winner: TGameResult;
  line: number[] | null;
}

// Интерфейс для контекста
export interface IGameContextType {
  history: IHistoryItem[];
  currentMove: number;
  lastMove: number | null;
  xIsNext: boolean;
  currentSquares: TSquareValue[];
  winner: TGameResult;
  line: number[] | null;
  handlePlay: (nextSquares: TSquareValue[], position: number) => void;
  jumpTo: (nextMove: number) => void;
  resetGame: () => void;
}

// пропсы для компонентов
export interface ISquareProps {
  value: TSquareValue;
  onSquareClick: () => void;
  isWinning?: boolean;
  isLastMove?: boolean;
}

export interface IGameProviderProps {
  children: React.ReactNode;
}

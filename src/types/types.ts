import React from 'react';
import { ReactNode } from 'react';

export type TGameSymbol<T = 'X' | 'O'> = T | null;
export type TSquareValue<T = 'X' | 'O'> = TGameSymbol<T>;

export type TGameResult<T = 'X' | 'O'> = T | 'Draw' | null;

//  интерфейс для истории ходов
export interface IHistoryItem<T = 'X' | 'O'> {
  squares: TSquareValue<T>[];
  lastPosition: number | null;
}

export interface IWinnerResult<T = 'X' | 'O' | 'Draw'> {
  winner: TGameResult<T>;
  line: number[] | null;
}

// Интерфейс для контекста
export interface IGameContextType<T = 'X' | 'O'> {
  history: IHistoryItem[];
  currentMove: number;
  lastMove: number | null;
  xIsNext: boolean;
  currentSquares: TSquareValue<T>[];
  winner: TGameResult<T>;
  line: number[] | null;
  handlePlay: (nextSquares: TSquareValue<T>[], position: number) => void;
  jumpTo: (nextMove: number) => void;
  resetGame: () => void;
}

// пропсы для компонентов
export interface ISquareProps<T = 'X' | 'O'> {
  value: TSquareValue<T>;
  onSquareClick: () => void;
  isWinning?: boolean;
  isLastMove?: boolean;
}

export interface IGameProviderProps {
  children: React.ReactNode;
}

// Интерфейс для модального окна
export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export interface IGameResultModalProps {
  isOpen: boolean;
  onClose: () => void;
}
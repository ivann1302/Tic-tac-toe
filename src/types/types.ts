import React from "react";

export type SquareValue = 'X' | 'O' | null;

export type GameResult = 'X' | 'O' | 'Draw' | null;

//  интерфейс для истории ходов
export interface HistoryItem {
    squares: SquareValue[],
    lastPosition: number | null;
}

export interface WinnerResult {
    winner: GameResult;
    line: number[] | null;
}

// Интерфейс для контекста
export interface GameContextType {
    history: HistoryItem[],
    currentMove: number;
    lastMove: number | null;
    xIsNext: boolean;
    currentSquares: SquareValue[];
    winner: GameResult;
    line: number[] | null;
    handlePlay: (nextSquares: SquareValue[], position: number) => void;
    jumpTo: (nextMove: number) => void;
    resetGame: () => void;
}

// пропсы для компонентов
export interface SquareProps {
    value: SquareValue;
    onSquareClick: () => void;
    isWinning?: boolean,
    isLastMove?: boolean;
}

export interface GameProviderProps {
    children: React.ReactNode;
}

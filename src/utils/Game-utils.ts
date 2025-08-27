import { SquareValue, WinnerResult,  GameResult } from '../types/types';

export function calculateWinner(squares: SquareValue[]): WinnerResult {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check for a winner
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a] as GameResult,
        line: lines[i],
      };
    }
  }

  // Check for a draw (all squares filled)
  if (!squares.includes(null)) {
    return {
      winner: 'Draw',
      line: null,
    };
  }

  // No winner yet
  return {
    winner: null,
    line: null,
  };
}
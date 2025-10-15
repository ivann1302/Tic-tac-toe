import { TSquareValue } from '../types/types';
import { calculateWinner } from './Game-utils';

export function getSmartMove(squares: TSquareValue[], aiSymbol: 'X' | 'O'): number | undefined {
  const humanSymbol = aiSymbol === 'X' ? 'O' : 'X';

  // 1. Если возможно выиграть
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      const testSquares = [...squares];
      testSquares[i] = aiSymbol;
      if (calculateWinner(testSquares).winner === aiSymbol) {
        return i;
      }
    }
  }

  // 2. Если возможно блокировать выигрыш человека
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      const testSquares = [...squares];
      testSquares[i] = humanSymbol;
      if (calculateWinner(testSquares).winner === humanSymbol) {
        return i;
      }
    }
  }

  // 3. Занять центр, если он свободен
  if (squares[4] === null) {
    return 4;
  }

  // 4. Занять углы (приоритет - противоположные)
  const corners = [0, 2, 6, 8];
  for (const corner of corners) {
    if (squares[corner] === null) {
      return corner;
    }
  }

  // 5. Занять стороны
  const sides = [1, 3, 5, 7];
  for (const side of sides) {
    if (squares[side] === null) {
      return side;
    }
  }

  return -1;
}

// Вспомогательная функция для случайного хода
export function getRandomMove(squares: TSquareValue[]): number {
  const emptySquares = squares
    .map((square, index) => (square === null ? index : null))
    .filter(index => index !== null) as number[];

  if (emptySquares.length === 0) return -1;
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
}

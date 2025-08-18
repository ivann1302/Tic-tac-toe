import React from 'react';
import Square from '../square/Square';
import { calculateWinner } from './../../utils/Game-utils.js';
import styles from './Board.module.scss';

function Board({ xIsNext, squares, onPlay }) {
  const { winner, line } = calculateWinner(squares);

  function handleClick(i) {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  function renderSquare(i) {
    const isWinningSquare = line?.includes(i);
    return (
      <Square value={squares[i]} onSquareClick={() => handleClick(i)} isWinning={isWinningSquare} />
    );
  }

  return (
    <div className={styles.board}>
      <div className={styles.boardRow}>
        {renderSquare(0)} {renderSquare(1)} {renderSquare(2)}
      </div>
      <div className={styles.boardRow}>
        {renderSquare(3)} {renderSquare(4)} {renderSquare(5)}
      </div>
      <div className={styles.boardRow}>
        {renderSquare(6)} {renderSquare(7)} {renderSquare(8)}
      </div>
    </div>
  );
}

export default Board;

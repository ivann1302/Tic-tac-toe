import Square from '../square/Square';
import { calculateWinner } from './../../utils/Game-utils.js';
import styles from './Board.module.scss';
import { useMemo, useCallback } from 'react';

function Board({ xIsNext, squares, onPlay, lastMove }) {
  const { winner, line } = useMemo(() => calculateWinner(squares), [squares]);

  const handleClick = useCallback(
    i => {
      if (squares[i] || winner) return;

      const nextSquares = squares.slice();
      nextSquares[i] = xIsNext ? 'X' : 'O';
      onPlay(nextSquares, i);
    },
    [onPlay, squares, winner, xIsNext]
  );

  const renderSquare = useCallback(
    i => {
      const isWinningSquare = line?.includes(i);
      const isLastMove = lastMove === i;
      return (
        <Square
          value={squares[i]}
          onSquareClick={() => handleClick(i)}
          isWinning={isWinningSquare}
          isLastMove={isLastMove}
        />
      );
    },
    [lastMove, squares, line, handleClick]
  );

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

import Square from '../square/Square';
import styles from './Board.module.scss';
import { useCallback } from 'react';
import { useGameContext } from '../../context/Game-context';

function Board() {
  const { xIsNext, currentSquares, handlePlay, lastMove, winner, line } = useGameContext();

  const handleClick = useCallback(
      (i: number) => {
      if (currentSquares[i] || winner) return;

      const nextSquares = currentSquares.slice();
      nextSquares[i] = xIsNext ? 'X' : 'O';
      handlePlay(nextSquares, i);
    },
    [handlePlay, currentSquares, winner, xIsNext]
  );

  const renderSquare = useCallback(
      (i: number) => {
      const isWinningSquare = line?.includes(i);
      const isLastMove = lastMove === i;
      return (
        <Square
          value={currentSquares[i]}
          onSquareClick={() => handleClick(i)}
          isWinning={isWinningSquare}
          isLastMove={isLastMove}
        />
      );
    },
    [lastMove, currentSquares, line, handleClick]
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

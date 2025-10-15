import Square from '../square/Square';
import styles from './Board.module.scss';
import { useCallback } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch.ts';
import { useAppSelector } from '../../hooks/useAppSelector.ts';
import {
  selectCurrentSquares,
  selectWinnerAndLine,
  selectLastMove,
  selectIsAIThinking,
} from '../../store/selectors';
import { playMove } from '../../store/gameSlice';

function Board() {
  const dispatch = useAppDispatch();
  const currentSquares = useAppSelector(selectCurrentSquares);
  const { winner, line } = useAppSelector(selectWinnerAndLine);
  const lastMove = useAppSelector(selectLastMove);
  const isAIThinking = useAppSelector(selectIsAIThinking);

  const handleClick = useCallback(
    (i: number) => {
      if (currentSquares[i] || winner || isAIThinking) return;
      dispatch(playMove(i));
    },
    [dispatch, currentSquares, winner, isAIThinking]
  );

  const renderSquare = useCallback(
    (i: number) => {
      const isWinningSquare = winner === 'Draw' ? true : line?.includes(i);
      const isLastMove = lastMove === i;
      return (
        <Square
          value={currentSquares[i]}
          onSquareClick={() => handleClick(i)}
          isWinning={isWinningSquare}
          isLastMove={isLastMove}
          disabled={isAIThinking}
        />
      );
    },
    [lastMove, currentSquares, line, handleClick, winner, isAIThinking]
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

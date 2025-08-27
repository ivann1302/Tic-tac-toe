import styles from './Square.module.scss'
import { SquareProps } from '../../types/types';

function Square({ value, onSquareClick, isWinning = false, isLastMove = false }: SquareProps) {
  return (
    <button
      className={`${styles.square} ${isWinning ? styles.winningSquare : ''}
      ${isLastMove ? styles.lastMoveSquare : ''}
      `}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default Square;
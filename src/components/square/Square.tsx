import styles from './Square.module.scss';
import { ISquareProps } from '../../types/types';

function Square({ value, onSquareClick, isWinning = false, isLastMove = false }: ISquareProps) {
  return (
    <button
      className={`${styles.square} ${isWinning ? styles.winningSquare : ''}
      ${isLastMove ? styles.lastMoveSquare : ''}
      `}
      onClick={onSquareClick}
    >
      {value && <span className={styles.symbol}>{value}</span>}
    </button>
  );
}

export default Square;

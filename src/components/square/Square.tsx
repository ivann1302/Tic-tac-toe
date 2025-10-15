import styles from './Square.module.scss';
import { ISquareProps } from '../../types/types';

function Square({
  value,
  onSquareClick,
  isWinning = false,
  isLastMove = false,
  disabled = false,
}: ISquareProps) {
  return (
    <button
      className={`${styles.square} ${isWinning ? styles.winningSquare : ''}
      ${isLastMove ? styles.lastMoveSquare : ''}
      ${disabled ? styles.disabled : ''}
      `}
      onClick={onSquareClick}
      disabled={disabled}
    >
      {value && <span className={styles.symbol}>{value}</span>}
    </button>
  );
}

export default Square;

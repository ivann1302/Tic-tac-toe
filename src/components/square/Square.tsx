import React from 'react';
import styles from './Square.module.scss';

function Square({ value, onSquareClick, isWinning, isLastMove }) {
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
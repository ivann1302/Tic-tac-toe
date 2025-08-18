import React from 'react';
import styles from './Game-status.module.scss';

function GameStatus({ winner, xIsNext }) {
  const status = winner
    ? winner === 'Draw'
      ? 'The game is a draw!'
      : `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return <div className={styles.status}>{status}</div>;
}

export default GameStatus;

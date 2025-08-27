import React from 'react';
import styles from './Game-status.module.scss';
import { useGameContext } from '../../context/Game-context';

function GameStatus() {
  const { winner, xIsNext } = useGameContext();

  const status = winner
    ? winner === 'Draw'
      ? 'The game is a draw!'
      : `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return <div className={styles.status}>{status}</div>;
}

export default GameStatus;
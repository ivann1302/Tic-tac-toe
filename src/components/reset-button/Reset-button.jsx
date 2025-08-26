import React from 'react';
import styles from './Reset-button.module.scss';
import { useGameContext } from '../../context/Game-context';

function ResetButton() {
  const { resetGame } = useGameContext();

  return (
    <button className={styles.resetButton} onClick={resetGame}>
      Reset Game
    </button>
  );
}

export default ResetButton;

import styles from './App.module.scss';
import Board from '../board/Board';
import GameStatus from '../game-status/Game-status';
import GameHistory from '../game-history/Game-history';
import ResetButton from '../reset-button/Reset-button';
import ThemeToggle from '../theme-toggle/Theme-toggle';

// Компонент управления состоянием с возможностью отслеживания истории
export default function Game() {
  return (
    <>
      <ThemeToggle />
      <div className={styles.game}>
        <div className={styles.gameBoard}>
          <GameStatus />
          <Board />
        </div>
        <div className={styles.gameInfo}>
          <GameHistory />
        </div>
      </div>
      <ResetButton />
    </>
  );
}

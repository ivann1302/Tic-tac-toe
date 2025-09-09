import { useState, useEffect } from "react";
import styles from './App.module.scss';
import Board from '../board/Board';
import GameStatus from '../game-status/Game-status';
import GameHistory from '../game-history/Game-history';
import ResetButton from '../reset-button/Reset-button';
import ThemeToggle from '../theme-toggle/Theme-toggle';
import GameResultModal from "../modal/game-result-modal/Game-result-modal.tsx";
import {useGameContext} from "../../context/Game-context.tsx";

export default function Game() {
    const { winner } = useGameContext();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (winner) {
            setShowModal(true);
        }
    }, [winner]);

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

        <GameResultModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
        />
    </>
  );
}

import { useEffect, useState } from 'react';
import styles from './OfflineGamePage.module.scss';
import Board from '../../components/board/Board';
import GameStatus from '../../components/game-status/Game-status';
import GameHistory from '../../components/game-history/Game-history';
import ResetButton from '../../components/reset-button/Reset-button';
import GameResultModal from '../../components/modal/game-result-modal/Game-result-modal';
import GoHomeButton from '../../components/go-home-button/GoHomeButton.tsx';
import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { selectWinnerAndLine } from '../../store/selectors.ts';
import GameTimer from '../../components/game-timer/game-timer';

export default function OfflineGamePage() {
  const { winner } = useAppSelector(selectWinnerAndLine);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (winner) {
      setShowModal(true);
    }
  }, [winner]);

  return (
    <div className={styles.offlineGamePage}>
      <div className={styles.game}>
        <div className={styles.gameBoard}>
          <GameStatus />
          <Board />
        </div>
        <div className={styles.gameInfo}>
          <GameHistory />
        </div>
      </div>
      <div className={styles.techContainer}>
        <GameTimer />
        <ResetButton />
        <GoHomeButton />
      </div>

      <GameResultModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

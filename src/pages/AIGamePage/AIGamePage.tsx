import { useEffect, useState } from 'react';
import styles from './AIGamePage.module.scss';
import Board from '../../components/board/Board';
import GameStatus from '../../components/game-status/Game-status';
import GameHistory from '../../components/game-history/Game-history';
import ResetButton from '../../components/reset-button/Reset-button';
import GameResultModal from '../../components/modal/game-result-modal/Game-result-modal';
import GoHomeButton from '../../components/go-home-button/GoHomeButton';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  selectWinnerAndLine,
  selectXIsNext,
  selectCurrentMove,
  selectIsViewingHistory,
  selectIsAIThinking,
} from '../../store/selectors';
import { playAIMove, resetGame, setAIThinking } from '../../store/gameSlice';
import GameTimer from '../../components/game-timer/game-timer';

export default function AIGamePage() {
  const dispatch = useAppDispatch();
  const { winner } = useAppSelector(selectWinnerAndLine);
  const xIsNext = useAppSelector(selectXIsNext);
  const currentMove = useAppSelector(selectCurrentMove);
  const isViewingHistory = useAppSelector(selectIsViewingHistory);
  const isAIThinking = useAppSelector(selectIsAIThinking);
  const [showModal, setShowModal] = useState(false);

  // Показываем модальное окно при победе
  useEffect(() => {
    if (winner) {
      setShowModal(true);
      dispatch(setAIThinking(false));
    }
  }, [winner, dispatch]);

  // Сбрасываем состояние ИИ при просмотре истории
  useEffect(() => {
    if (isViewingHistory) {
      dispatch(setAIThinking(false));
    }
  }, [isViewingHistory, dispatch]);

  // Автоматический ход ИИ после хода игрока (только если не просматриваем историю)
  useEffect(() => {
    if (!winner && !xIsNext && currentMove > 0 && !isViewingHistory) {
      dispatch(setAIThinking(true));

      // Добавляем небольшую задержку для реалистичности
      const timer = setTimeout(() => {
        dispatch(playAIMove());
        dispatch(setAIThinking(false));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [xIsNext, currentMove, winner, isViewingHistory, dispatch]);

  // Сброс игры при размонтировании компонента
  useEffect(() => {
    return () => {
      dispatch(resetGame());
    };
  }, [dispatch]);

  return (
    <div className={styles.aiGamePage}>
      <div className={styles.game}>
        <div className={styles.gameBoard}>
          <div className={styles.statusContainer}>
            <GameStatus />
            <div className={`${styles.aiThinking} ${isAIThinking ? styles.visible : ''}`}>
              <div className={styles.spinner}></div>
              <span>ИИ думает...</span>
            </div>
          </div>
          <div className={styles.boardContainer}>
            <Board />
          </div>
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

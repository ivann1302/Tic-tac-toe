import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { selectWinnerAndLine, selectCurrentMove } from '../../store/selectors.ts';
import styles from './game-timer.module.scss';
const GAME_TIMER_KEY = 'tic-tac-toe-game-timer';

function GameTimer() {
  const [time, setTime] = useState(0);
  const winner = useAppSelector(selectWinnerAndLine);
  const currentMove = useAppSelector(selectCurrentMove);

  useEffect(() => {
    const saved = sessionStorage.getItem(GAME_TIMER_KEY);
    if (saved) {
      setTime(parseInt(saved));
    }
  }, []);

  useEffect(() => {
    if (currentMove > 0 && !winner.winner) {
      const timer = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          sessionStorage.setItem(GAME_TIMER_KEY, newTime.toString());
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentMove, winner]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (currentMove === 0) {
      setTime(0);
      sessionStorage.removeItem(GAME_TIMER_KEY);
    }
  }, [currentMove]);

  return (
    <div className={styles.gameTimer}>
      <p>Game Timer:</p>
      <div>{formatTime(time)}</div>
    </div>
  );
}

export default GameTimer;

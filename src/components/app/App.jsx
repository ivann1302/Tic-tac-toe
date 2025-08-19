import styles from './App.module.scss';
import { useState } from 'react';
import Board from '../board/Board';
import GameStatus from '../game-status/Game-status';
import GameHistory from '../game-history/Game-history';
import ResetButton from '../reset-button/Reset-button';
import { calculateWinner } from '../../utils/Game-utils';

// Компонент управления состоянием с возможностью отслеживания истории
export default function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      lastPosition: null,
    },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [lastMove, setLastMove] = useState(null);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  // обработчик события, отвечающий за обновление истории игры,
  //  nextSquares - массив, представляющий игровое поле после хода
  function handlePlay(nextSquares, position) {
    // удаление ходов при перемотке игры назад
    const nextHistory = [...history.slice(0, currentMove + 1),
      {
        squares: nextSquares,
        lastPosition: position,
      },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setLastMove(position);
  }

  // обработчик события, отвечающий за перемотку к определенному ходу игры
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setLastMove(history[nextMove].lastPosition);
  }

  // Get the current game status
  const { winner, line } = calculateWinner(currentSquares);

  function resetGame() {
    setHistory([{
      squares: Array(9).fill(null),
      lastPosition: null,
    }]);
    setCurrentMove(0);
    setLastMove(null);
  }

  return (
    <>
      <div className={styles.game}>
        <div className={styles.gameBoard}>
          <GameStatus winner={winner} xIsNext={xIsNext} />
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            lastMove={lastMove}
          />
        </div>
        <div className={styles.gameInfo}>
          <GameHistory history={history} currentMove={currentMove} onJumpTo={jumpTo} />
        </div>
      </div>
      <ResetButton onReset={resetGame} />
    </>
  );
}

import styles from './App.module.scss';
import { useState } from 'react';
import Board from '../board/Board';
import GameStatus from '../game-status/Game-status';
import GameHistory from '../game-history/Game-history';
import ResetButton from '../reset-button/Reset-button';
import { calculateWinner } from '../../utils/Game-utils';


// Компонент управления состоянием с возможностью отслеживания истории
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  // определение очередности хода
  const xIsNext = currentMove % 2 === 0;
  // текущее состояние игрового поля
  const currentSquares = history[currentMove];

  // обработчик события, отвечающий за обновление истории игры,
  //  nextSquares - массив, представляющий игровое поле после хода
  function handlePlay(nextSquares) {
  // удаление ходов при перемотке игры назад
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1);
  }

  // обработчик события, отвечающий за перемотку к определенному ходу игры
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Get the current game status
  const { winner, line } = calculateWinner(currentSquares);

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  return (
    <>
      <div className={styles.game}>
        <div className={styles.gameBoard}>
          <GameStatus winner={winner} xIsNext={xIsNext} />
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className={styles.gameInfo}>
          <GameHistory 
            history={history} 
            currentMove={currentMove} 
            onJumpTo={jumpTo} 
          />
        </div>
      </div>
      <ResetButton onReset={resetGame} />
    </>
  );
}

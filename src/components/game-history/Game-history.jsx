import styles from './Game-history.module.scss';
import { useMemo } from 'react';

function GameHistory({ history, currentMove, onJumpTo }) {
  const moves = useMemo(() => {
    return history.map((historyItem, move) => {
      let description;
      if (move === 0) {
        description = 'Go to game start';
      } else if (move === currentMove) {
        description = 'Current move';
      } else {
        description = `Go to move #${move}`;
      }

      return (
        <li key={move} className={move === currentMove ? styles.currentMove : ''}>
          {move === currentMove ? (
            <h3>{move === 0 ? 'Current move' : `Current move #${move}`}</h3>
          ) : (
            <button onClick={() => onJumpTo(move)}>{description}</button>
          )}
        </li>
      );
    });
  }, [history, currentMove, onJumpTo]);

  return (
    <div className={styles.gameHistory}>
      <h3>Game History</h3>
      <ol>{moves}</ol>
    </div>
  );
}

export default GameHistory;

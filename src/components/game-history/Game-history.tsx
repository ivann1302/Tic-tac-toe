import styles from './Game-history.module.scss';
import { useMemo } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch.ts';
import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { selectHistory, selectCurrentMove } from '../../store/selectors';
import { jumpTo } from '../../store/gameSlice';

function GameHistory() {
  const dispatch = useAppDispatch();
  const history = useAppSelector(selectHistory);
  const currentMove = useAppSelector(selectCurrentMove);

  const moves = useMemo(() => {
    return history.map((_historyItem, move) => {
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
            <button onClick={() => dispatch(jumpTo(move))}>{description}</button>
          )}
        </li>
      );
    });
  }, [history, currentMove, dispatch]);

  return (
    <div className={styles.gameHistory}>
      <h3>Game History</h3>
      <ol>{moves}</ol>
    </div>
  );
}

export default GameHistory;

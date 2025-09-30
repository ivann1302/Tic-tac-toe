import styles from './Game-status.module.scss';
import { selectXIsNext, selectWinnerAndLine } from '../../store/selectors.ts';
import { useAppSelector } from '../../hooks/useAppSelector.ts';

function GameStatus() {
  const { winner } = useAppSelector(selectWinnerAndLine);
  const xIsNext = useAppSelector(selectXIsNext);

  const status = winner
    ? winner === 'Draw'
      ? 'The game is a draw!'
      : `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return <div className={styles.status}>{status}</div>;
}

export default GameStatus;

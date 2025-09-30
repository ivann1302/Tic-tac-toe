import styles from './Reset-button.module.scss';
import { useAppDispatch } from '../../hooks/useAppDispatch.ts';
import { resetGame } from '../../store/gameSlice.ts';

function ResetButton() {
  const dispatch = useAppDispatch();

  return (
    <button className={styles.resetButton} onClick={() => dispatch(resetGame())}>
      Reset Game
    </button>
  );
}

export default ResetButton;

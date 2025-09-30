import Modal from './../Modal.tsx';
import styles from './Game-result-modal.module.scss';
import { IGameResultModalProps } from '../../../types/types.ts';
import { useAppSelector } from '../../../hooks/useAppSelector.ts';
import { selectWinnerAndLine } from '../../../store/selectors.ts';
import { resetGame } from '../../../store/gameSlice.ts';
import { useAppDispatch } from '../../../hooks/useAppDispatch.ts';
function GameResultModal({ isOpen, onClose }: IGameResultModalProps) {
  const { winner } = useAppSelector(selectWinnerAndLine);
  const dispatch = useAppDispatch();

  const handlePlayAgain = () => {
    dispatch(resetGame());
    onClose();
  };

  let resultMessage: string = '';
  let resultClass: string = '';

  if (winner === 'X' || winner === 'O') {
    resultMessage = `Winner is: "${winner}"!`;
    resultClass = styles.winner;
  } else if (winner === 'Draw') {
    resultMessage = 'The game is drawn!';
    resultClass = styles.draw;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.resultModal}>
        <h2 className={resultClass}>{resultMessage}</h2>
        <div className={styles.buttons}>
          <button className={styles.playAgainButton} onClick={handlePlayAgain}>
            Play again
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default GameResultModal;

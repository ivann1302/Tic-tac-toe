import { useGameContext} from "../../../context/Game-context.tsx";
import Modal from './../Modal.tsx';
import styles from "./Game-result-modal.module.scss";
import { IGameResultModalProps} from "../../../types/types.ts";

function GameResultModal({ isOpen, onClose }: IGameResultModalProps) {
    const { winner, resetGame } = useGameContext();

    const handlePlayAgain = () => {
        resetGame();
        onClose();
    }

    let resultMessage: string = '';
    let resultClass: string = '';

    if (winner ==='X' || winner ==='O') {
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
                            Играть снова
                        </button>
                        <button className={styles.closeButton} onClick={onClose}>
                            Закрыть
                        </button>
                    </div>
            </div>
        </Modal>
    )
}

export default GameResultModal;

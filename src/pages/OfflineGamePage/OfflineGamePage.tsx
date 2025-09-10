import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './OfflineGamePage.module.scss';
import Board from '../../components/board/Board';
import GameStatus from '../../components/game-status/Game-status';
import GameHistory from '../../components/game-history/Game-history';
import ResetButton from '../../components/reset-button/Reset-button';
import GameResultModal from '../../components/modal/game-result-modal/Game-result-modal';
import { useGameContext } from '../../context/Game-context';

export default function OfflineGamePage() {
    const { winner } = useGameContext();
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        if (winner) {
            setShowModal(true);
        }
    }, [winner]);

    return (
        <div className={styles.offlineGamePage}>
            <Link to="/" className={styles.backLink}>← Вернуться на главную</Link>

            <div className={styles.game}>
                <div className={styles.gameBoard}>
                    <GameStatus />
                    <Board />
                </div>
                <div className={styles.gameInfo}>
                    <GameHistory />
                </div>
            </div>
            <ResetButton />

            <GameResultModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
}
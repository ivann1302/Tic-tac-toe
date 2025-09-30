import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <h2>Welcome to Tic-tac-toe game!</h2>
      <p>Select game mode: </p>
      <div className={styles.gameOptions}>
        <Link to="/offline" className={styles.gameOption}>
          <div className={styles.card}>
            <h3>Offline game</h3>
            <p>Play on the same device against each other</p>
          </div>
        </Link>

        <Link to="/online" className={styles.gameOption}>
          <div className={styles.card}>
            <h3>Online game</h3>
            <p>Play against other players in Internet</p>
          </div>
        </Link>

        <Link to="/ai" className={styles.gameOption}>
          <div className={styles.card}>
            <h3>Game against AI</h3>
            <p>Play against artificial intelligence</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

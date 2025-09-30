import { useNavigate } from 'react-router-dom';
import styles from './GoHomeButton.module.scss';

function goHome() {
  const navigate = useNavigate();
  function goHome() {
    navigate('/');
  }

  return (
    <button onClick={goHome} className={styles.goHomeButton}>
      Return to Home page
    </button>
  );
}

export default goHome;

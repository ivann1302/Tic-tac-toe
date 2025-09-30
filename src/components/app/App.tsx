import styles from './App.module.scss';
import { Routes, Route } from 'react-router-dom';
import ThemeToggle from '../theme-toggle/Theme-toggle';
import HomePage from '../../pages/HomePage/HomePage';
import OfflineGamePage from '../../pages/OfflineGamePage/OfflineGamePage';
// import OnlineGamePage from '../../pages/OnlineGamePage/OnlineGamePage';
// import AIGamePage from '../../pages/AIGamePage/AIGamePage';
import { UnderDevelopmentPage } from '../../pages/UnderDevelopmentPage/UnderDevelopmentPage.tsx';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

export default function App() {
  return (
    <div className={styles.app}>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="offline" element={<OfflineGamePage />} />
        <Route path="online" element={<UnderDevelopmentPage mode="online" />} />
        <Route path="ai" element={<UnderDevelopmentPage mode="online" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

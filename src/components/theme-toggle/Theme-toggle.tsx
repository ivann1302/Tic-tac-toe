import { useThemeContext } from '../../context/Theme-context';
import styles from './Theme-toggle.module.scss';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();
  const checked = theme === 'light';

  return (
    <label className={styles.switch} aria-label={`Switch to ${checked ? 'dark' : 'light'} theme`}>
      <input type="checkbox" onChange={toggleTheme} checked={checked} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
}

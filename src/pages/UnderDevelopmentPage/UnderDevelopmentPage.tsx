import GoHomeButton from '../../components/go-home-button/GoHomeButton.tsx';
import styles from './UnderDevelopmentPage.module.scss';
import { IUnderDevelopmentPageProps } from '../../types/types.ts';

export function UnderDevelopmentPage({ mode }: IUnderDevelopmentPageProps) {
  const modeText = mode === 'online' ? 'online' : ' with ai';

  return (
    <div className={styles.underDevelopmentPage}>
      <h2>Game mode {modeText} is under development</h2>
      <p>It will be available soon</p>
      <div className={styles.illustration}>🚧 👷‍♀️ 🔨</div>
      <GoHomeButton />
    </div>
  );
}

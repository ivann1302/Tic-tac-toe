import { Link } from "react-router-dom";
import styles from "./UnderDevelopmentPage.module.scss";

interface IUnderDevelopmentPageProps {
    mode: 'online' | 'ai';
}

export function UnderDevelopmentPage( { mode }: IUnderDevelopmentPageProps ) {
    const modeText = mode === 'online' ? 'online' : ' with ai';

    return (
        <div className={styles.underDevelopmentPage}>
            <h2>Game mode {modeText} is under development</h2>
            <p>It will be available soon</p>
            <div className={styles.illustration}>
                🚧 👷‍♀️ 🔨
            </div>
            <Link to='/' className={styles.backLink}>Return to Home page</Link>
        </div>
    );
}
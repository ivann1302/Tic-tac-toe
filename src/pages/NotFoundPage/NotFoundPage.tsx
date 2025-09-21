import styles from './NotFoundPage.module.scss';
import GoHomeButton from "../../components/go-home-button/GoHomeButton.tsx";

function NotFoundPage() {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Oops... Page not Found 🔍</h2>
            <GoHomeButton />
        </section>
    )
}

export default NotFoundPage;
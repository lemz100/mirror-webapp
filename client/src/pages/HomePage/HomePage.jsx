import styles from './Hpage.module.less';
import Button from '@/components/Button/Button';
import { Routes, Route, Link } from 'react-router-dom';

function HomePage() {
  return (
    <section className={styles.homepage}>
      <main className={styles.content}>
        <h1>Welcome to Mirror!</h1>
        <span className={styles.buttons}>
          <Link className={styles.signup} to="/register">
            Sign Up
          </Link>
          <Link className={styles.login} to="/login">
            Log in
          </Link>
        </span>
      </main>
    </section>
  );
}

export default HomePage;

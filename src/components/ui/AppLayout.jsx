import { Outlet } from 'react-router-dom';

import styles from '../styles/applayout.module.css';
import Sidebar from './Sidebar';
import Header from './Header';

function AppLayout() {
  return (
    <section className={styles.main}>
      <Sidebar />
      <main className={styles.content}>
        <Header />
        <Outlet />
      </main>
    </section>
  );
}

export default AppLayout;

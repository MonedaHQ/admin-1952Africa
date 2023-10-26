import { Outlet } from 'react-router-dom';

import styles from '../styles/applayout.module.css';
import Sidebar from '../features/dashboard/Sidebar';
import Header from './Header';

function AppLayout() {
  return (
    <section className={styles.main}>
      <Sidebar />
      <main>
        <Header />
        <Outlet />
      </main>
    </section>
  );
}

export default AppLayout;

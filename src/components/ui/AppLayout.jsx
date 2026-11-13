import { Suspense, useRef } from 'react';
import { Outlet } from 'react-router-dom';

import useScrollToTopOnRouteChange from '../../hooks/useScrollToTopOnRouteChange';

import Header from './Header';
import Sidebar from './Sidebar';

import styles from '../styles/applayout.module.css';

function AppLayout() {
  const ref = useRef(null);
  useScrollToTopOnRouteChange(ref);

  return (
    <section className={styles.main}>
      <Sidebar />
      <main className={styles.content}>
        <Header />
        <div className={styles.outlet} ref={ref}>
          <Suspense fallback={<OutletLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </section>
  );
}

function OutletLoader() {
  return (
    <div className="route-loader route-loader--content" role="status" aria-label="Loading page">
      <span className="route-loader__mark" />
      <small>Loading page</small>
    </div>
  );
}

export default AppLayout;

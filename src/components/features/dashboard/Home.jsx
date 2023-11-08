import { motion } from 'framer-motion';

import { headerVariant } from '../../../data/animationVariants';

import Metrics from './Metrics';
import QuickActions from '../../ui/QuickActions';

import styles from './styles/home.module.css';

function Home() {
  const quickActions = [
    { label: 'Add Event', path: '/events' },
    { label: 'Add Artist', path: '/artists/add' },
    // { label: 'Add Program', path: '/programs/add' },
    { label: 'Add Activity', path: '/activities/add' },
    { label: 'Add Exhibition', path: '/gallery' },
  ];

  return (
    <motion.section className={styles.section}>
      <motion.h1 variants={headerVariant} initial="hidden" animate="visible">
        Hello Toyin,
      </motion.h1>
      <div className={styles.dashboard}>
        <div className={styles.quickActions}>
          {quickActions.map((action) => (
            <QuickActions action={action} key={action.label} />
          ))}
        </div>
        <Metrics />
      </div>
    </motion.section>
  );
}

export default Home;

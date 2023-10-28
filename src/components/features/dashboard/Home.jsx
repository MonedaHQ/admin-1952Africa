import { useNavigate } from 'react-router-dom';
import { IoMdAddCircle } from 'react-icons/io';

import { motion } from 'framer-motion';

import Metrics from './Metrics';

import styles from './styles/home.module.css';
import { headerVariant } from '../../../data/animationVariants';

function Home() {
  const quickActions = [
    { label: 'Add Event', path: '/events' },
    { label: 'Add Artist', path: '/artist' },
    { label: 'Add Program', path: '/programs' },
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

function QuickActions({ action }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(action.path)} className={styles.action}>
      <IoMdAddCircle />

      <span>{action.label}</span>
    </button>
  );
}

export default Home;

import { motion } from 'framer-motion';
import { headerVariant } from '../../../data/animationVariants';

import styles from './styles/addactivity.module.css';
import AddCoverImg from './AddCoverImg';
import EditActivity from './EditActivity';

function AddActivity() {
  return (
    <section className={styles.section}>
      <motion.h2 variants={headerVariant} initial="hidden" animate="visible">
        Add Activity
      </motion.h2>
      <div className={styles.main}>
        <AddCoverImg />
        <EditActivity />
      </div>
    </section>
  );
}

export default AddActivity;

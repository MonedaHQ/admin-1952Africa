import { motion } from 'framer-motion';

import AddCoverImg from './AddCoverImg';
import ProgramData from './ProgramData';

import styles from './styles/addprograms.module.css';
import { headerVariant } from '../../../data/animationVariants';

function AddPrograms() {
  return (
    <section className={styles.section}>
      <motion.h2 variants={headerVariant} initial="hidden" animate="visible">
        Add Program
      </motion.h2>
      <div className={styles.main}>
        <AddCoverImg />
        <ProgramData />
      </div>
    </section>
  );
}

export default AddPrograms;

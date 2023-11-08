import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { programData } from '../../../data/programsData';

import { headerVariant } from '../../../data/animationVariants';

import AddCoverImg from './AddCoverImg';
import ProgramData from './ProgramData';

import styles from './styles/editprogram.module.css';

function EditProgram() {
  const { slug } = useParams();
  const program = programData.find((program) => program.slug === slug);
  return (
    <section className={styles.section}>
      <motion.h2 variants={headerVariant} initial="hidden" animate="visible">
        Edit {program.title}
      </motion.h2>
      <div className={styles.main}>
        <AddCoverImg />
        <ProgramData />
      </div>
    </section>
  );
}

export default EditProgram;

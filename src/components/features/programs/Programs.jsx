import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { programData } from '../../../data/programsData';

import Button from '../../ui/Button';

import styles from './styles/programs.module.css';
import { headerVariant } from '../../../data/animationVariants';

function Programs() {
  const programs = programData;

  return (
    <section className={styles.section}>
      <motion.h2 variants={headerVariant} initial="hidden" animate="visible">
        Programs
      </motion.h2>
      <div className={styles.main}>
        {programs.map((program) => (
          <Program program={program} key={program.id} />
        ))}
      </div>
    </section>
  );
}

function Program({ program }) {
  const navigate = useNavigate();
  return (
    <div className={styles.program}>
      <img src={program.cover_img} alt={program.title} draggable="false" />
      <h4>{program.title}</h4>
      <div className={styles.btnWrapper}>
        <Button
          variant="primary"
          onClick={() => navigate(`/programs/${program.id}`)}
        >
          View
        </Button>
        <Button variant="link-warn">Delete</Button>
      </div>
    </div>
  );
}

export default Programs;

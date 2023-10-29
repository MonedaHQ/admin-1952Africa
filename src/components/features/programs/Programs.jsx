import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { programData } from '../../../data/programsData';
import { headerVariant } from '../../../data/animationVariants';

import Button from '../../ui/Button';
import QuickActions from '../../ui/QuickActions';

import styles from './styles/programs.module.css';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

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
      <div className={styles.actionBtn}>
        <QuickActions
          action={{ label: 'Add program', path: '/programs/add' }}
        />
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
        <Modal>
          <Button
            variant="primary"
            onClick={() => navigate(`/programs/${program.slug}`)}
          >
            View
          </Button>
          <Modal.Open opens="delete">
            <Button variant="link-warn">Delete</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete resourceName={program.title} />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default Programs;

import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../ui/Button';

import styles from './styles/program.module.css';
import { headerVariant } from '../../../data/animationVariants';

function ProgramTitle({ program }) {
  const navigate = useNavigate();
  const { slug } = useParams();
  return (
    <div className={styles.titleContainer}>
      <img src={program.cover_img} alt={program.title} draggable="false" />
      <motion.h2 variants={headerVariant} initial="hidden" animate="visible">
        {program.title}
      </motion.h2>
      <p>{program.description}</p>
      <div className={styles.btnWrapper}>
        <Button
          variant="primary"
          onClick={() => navigate(`/programs/${slug}/edit`)}
        >
          Edit
        </Button>
        <Button variant="link-dark" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </div>
    </div>
  );
}

export default ProgramTitle;

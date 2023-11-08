import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

import { headerVariant } from '../../../data/animationVariants';
import { activitesData } from '../../../data/programsData';

import EditActivity from './EditActivity';
import Button from '../../ui/Button';

import styles from './styles/activity.module.css';

function Activity() {
  const { id } = useParams();

  const activity = activitesData.find((activity) => activity.id === id);

  return (
    <section className={styles.section}>
      <div className={styles.titleContainer}>
        <img src={activity.image_url} alt={activity.title} draggable="false" />
        <motion.h2 variants={headerVariant} initial="hidden" animate="visible">
          {activity.title}
        </motion.h2>
        <Button variant="primary">Replace image</Button>
      </div>
      <EditActivity activity={activity} />
    </section>
  );
}

export default Activity;

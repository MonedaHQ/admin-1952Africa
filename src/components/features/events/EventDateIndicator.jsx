import { motion } from 'framer-motion';

import { formatDateToRelative } from '../../../utilities/helpers';

import styles from './styles/eventdateindicator.module.css';

function EventDateIndicator({ event }) {
  const containerVariant = {
    hidden: { opacity: 0, scale: 0, transform: 'translateY(14px)' },
    visible: {
      opacity: 1,
      scale: 1,
      transform: 'translateY(0)',
      transition: { delay: 0.5 },
    },
  };

  const { start_date, end_date } = event;
  const isEnded = formatDateToRelative(end_date).includes('ago');
  const isStarted = formatDateToRelative(start_date).includes('in');
  return (
    <motion.div
      className={`${styles.eventDate} ${
        styles[isEnded ? 'expired' : 'running']
      }`}
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      <p>
        {`Start${isStarted ? 'ing' : 'ed'}`}{' '}
        <strong>{formatDateToRelative(start_date)}</strong>{' '}
        {`${isStarted ? 'and ending ' : `end${isEnded ? 'ed ' : 'ing '}`}`}
        <strong>{formatDateToRelative(end_date)}</strong>
      </p>
    </motion.div>
  );
}

export default EventDateIndicator;

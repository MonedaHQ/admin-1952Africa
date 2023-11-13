import { motion } from 'framer-motion';
import { headerVariant } from '../../../data/animationVariants';

import styles from './styles/bigheader.module.css';

function BigHeader({ title, variant }) {
  return (
    <motion.h1
      className={styles[variant]}
      variants={headerVariant}
      initial="hidden"
      animate="visible"
    >
      {title}
    </motion.h1>
  );
}

export default BigHeader;

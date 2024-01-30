import { motion } from 'framer-motion';
import { headerVariant } from '../../../data/animationVariants';

import styles from './styles/bigheader.module.css';

function BigHeader({ title, variant, userRole, useRole = false }) {
  return (
    <header>
      <motion.h1
        className={styles[variant]}
        variants={headerVariant}
        initial="hidden"
        animate="visible"
      >
        {title}
      </motion.h1>

      {useRole && (
        <span className={`${styles.role}  ${styles[userRole.toLowerCase()]}`}>
          {userRole}
        </span>
      )}
    </header>
  );
}

export default BigHeader;

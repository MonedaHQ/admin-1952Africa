import { motion } from 'framer-motion';
import { headerVariant } from '../../../data/animationVariants';

import styles from './styles/bigheader.module.css';

function BigHeader({ title, variant, userRole, useRole = false }) {
  return (
    <header className={styles.header}>
      <div className={styles.titleRow}>
        <motion.h1
          className={styles[variant]}
          variants={headerVariant}
          initial="hidden"
          animate="visible"
        >
          {title}
        </motion.h1>

        {useRole && (
          <span className={`${styles.role} ${styles[userRole.toLowerCase()]}`}>
            {userRole}
          </span>
        )}
      </div>
    </header>
  );
}

export default BigHeader;

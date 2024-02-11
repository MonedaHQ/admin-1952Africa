import { motion, useInView } from 'framer-motion';

import styles from '../styles/loader.module.css';
import { useRef } from 'react';

function Loader({ fullScreen = true }) {
  const tableVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.1 } },
  };

  const ref = useRef();

  const inView = useInView(ref, { once: true });

  return (
    <div className={fullScreen ? styles.full : ''}>
      <motion.div
        className={styles.loaderContainer}
        variants={tableVariants}
        ref={ref}
        initial="hidden"
        animate={`${inView ? 'visible' : 'hidden'}`}
      >
        <span className={styles.loader}></span>
      </motion.div>
    </div>
  );
}

export default Loader;

import { motion } from 'framer-motion';

import styles from './styles/reuseableloginscreen.module.css';
import { fadeIn } from '../../../utilities/anim';

function ReusableLogInScreen({ message, element }) {
  return (
    <main className={styles.main}>
      <motion.div
        className={styles.login}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.logo}>
          <img src="/images/1952-logo.png" alt="1952 Logo" draggable="false" />
        </div>
        <h4>{message}</h4>
        {element}
      </motion.div>
    </main>
  );
}

export default ReusableLogInScreen;

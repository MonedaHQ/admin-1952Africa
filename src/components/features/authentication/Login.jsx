import { motion } from 'framer-motion';

import LoginForm from './LoginForm';
import styles from './styles/login.module.css';

function Login() {
  const containerVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.3, duration: 0.5 },
    },
  };

  return (
    <main className={styles.main}>
      <motion.div
        className={styles.login}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.logo}>
          <img src="/images/1952-logo.png" alt="1952 Logo" draggable="false" />
        </div>
        <h4>Please log in to continue</h4>
        <LoginForm />
      </motion.div>
    </main>
  );
}

export default Login;

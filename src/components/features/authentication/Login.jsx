import { motion } from 'framer-motion';

import LoginForm from './LoginForm';
import styles from './styles/login.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('1952adminUser'));

  useEffect(
    function () {
      if (user) navigate('/home');
    },
    [user, navigate]
  );

  const containerVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.3, duration: 0.1 },
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

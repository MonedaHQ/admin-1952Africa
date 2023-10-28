import { motion } from 'framer-motion';

import Avatar from './forms/Avatar';
import ChangePassword from './forms/ChangePassword';
import PersonalInfo from './forms/PersonalInfo';
import styles from './styles/profile.module.css';
import { headerVariant } from '../../../data/animationVariants';

function Profile() {
  return (
    <section className={styles.section}>
      <motion.h2 variants={headerVariant} initial="hidden" animate="visible">
        Account Preferences
      </motion.h2>
      <div className={styles.main}>
        <Avatar />
        <PersonalInfo />
        <ChangePassword />
      </div>
    </section>
  );
}

export default Profile;

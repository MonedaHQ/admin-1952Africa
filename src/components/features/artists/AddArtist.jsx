import { motion } from 'framer-motion';

import styles from './styles/addartist.module.css';
import { headerVariant } from '../../../data/animationVariants';
import Avatar from '../../ui/Avatar';
import ArtistForm from './ArtistForm';

function AddArtist() {
  return (
    <section className={styles.section}>
      <motion.h2 variants={headerVariant} initial="hidden" animate="visible">
        Add Artist
      </motion.h2>
      <div className={styles.main}>
        <Avatar />
        <ArtistForm />
      </div>
    </section>
  );
}

export default AddArtist;

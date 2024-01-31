import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { headerVariant } from '../../data/animationVariants';

import Button from './Button';

import styles from '../styles/bigtitle.module.css';

/**
 * BigTitle Component
 *
 * This component displays a big title along with an image, description, and navigation buttons.
 * It utilizes the Framer Motion library for animations and React Router for navigation.
 *
 * @component
 * @param {Object} titleData - The data object containing information for the title.
 * @param {string} titleData.title - The title to be displayed.
 * @param {string} titleData.description - The description accompanying the title.
 * @param {string} titleData.image - The URL of the image associated with the title.
 * @param {string} titleData.navigation - The navigation identifier for the 'Edit' button.
 *                                      If set to -1, the 'Go back' button is displayed instead.
 * @returns {JSX.Element} - The rendered BigTitle component.
 */

function BigTitle({ titleData }) {
  const navigate = useNavigate();
  let title = '';
  let description = '';
  let image = '/images/no-image.jpg';
  let navigation = -1;

  if (titleData) {
    title = titleData.title;
    description = titleData.description;
    image = titleData.image;
    navigation = titleData.navigation;
  }

  return (
    <div className={styles.titleContainer}>
      <img src={image} alt={title} draggable="false" />
      <motion.h2 variants={headerVariant} initial="hidden" animate="visible">
        {title}
      </motion.h2>
      <p>{description}</p>
      <div className={styles.btnWrap}>
        <Button variant="primary" onClick={() => navigate(navigation)}>
          Edit
        </Button>
        <Button variant="link-warn" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </div>
    </div>
  );
}

export default BigTitle;

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { headerVariant } from '../../data/animationVariants';

import Button from './Button';

import styles from '../styles/bigtitle.module.css';
import { truncateString } from '../../utilities/helpers';

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

function BigTitle({ titleData, navigateTo = -1 }) {
  const navigate = useNavigate();
  let title = '';
  let description = '';
  let image = '/images/no-image.jpg';
  let navigation = -1;

  if (titleData) {
    title = titleData.title;
    description = truncateString(
      String(titleData.description || '').replace(/<[^>]*>/g, ''),
      45
    );
    image = titleData.image;
    navigation = titleData.navigation;
  }

  return (
    <div className={styles.titleContainer}>
      <div className={styles.imageWrap}>
        <img src={image || '/images/empty-img.jpg'} alt={title} draggable="false" />
      </div>
      <div className={styles.content}>
        <span className={styles.eyebrow}>Overview</span>
        <motion.h2 variants={headerVariant} initial="hidden" animate="visible">
          {title}
        </motion.h2>
        <p>{description || 'No description has been added yet.'}</p>
        <div className={styles.btnWrap}>
          <Button variant="primary" onClick={() => navigate(navigation)}>
            Edit details
          </Button>
          <Button variant="link-dark" onClick={() => navigate(navigateTo)}>
            Back to list
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BigTitle;

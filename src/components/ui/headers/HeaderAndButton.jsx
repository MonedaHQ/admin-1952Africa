import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { headerVariant } from '../../../data/animationVariants';

import styles from './styles/headerandbutton.module.css';
import { IoIosTrash, IoMdAddCircle } from 'react-icons/io';
import Modal from '../Modal';
import ConfirmDelete from '../ConfirmDelete';

/**
 * HeaderAndButton component for rendering a header and an add button.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.header - The text to be displayed as the header.
 * @param {Object} props.navigateTo - Information about the destination to navigate to.
 * @param {string} props.navigateTo.path - The path to navigate to when the add button is clicked.
 * @param {string} props.navigateTo.label - The label to be displayed alongside the add button.
 * @param {string} [props.type='xl'] - The type of header, defaults to 'xl'.
 * @returns {JSX.Element} - React component for rendering the header and add button.
 */

function HeaderAndButton({
  header,
  navigateTo,
  type = 'xl',
  as = 'button',
  onConfirm,
}) {
  return (
    <div className={styles.header}>
      <motion.h2
        variants={headerVariant}
        initial="hidden"
        animate="visible"
        className={styles[type]}
      >
        {header}
      </motion.h2>
      <AddButton navigateTo={navigateTo} as={as} onConfirm={onConfirm} />
    </div>
  );
}

function AddButton({ navigateTo, as, onConfirm }) {
  const navigate = useNavigate();
  if (as === 'delete') {
    return (
      <Modal>
        <Modal.Open opens="delete">
          <button className={`${styles.btn} ${styles.delete}`}>
            <p>
              <span>
                <IoIosTrash />
              </span>
              {navigateTo.label}
            </p>
          </button>
        </Modal.Open>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName={navigateTo.resourceName}
            onConfirm={onConfirm}
          />
        </Modal.Window>
      </Modal>
    );
  }

  return (
    <button className={styles.btn} onClick={() => navigate(navigateTo.path)}>
      <p>
        <span>
          <IoMdAddCircle />
        </span>
        {navigateTo.label}
      </p>
    </button>
  );
}

export default HeaderAndButton;

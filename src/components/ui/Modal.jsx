import { createPortal } from 'react-dom';
import { cloneElement, createContext, useContext, useState } from 'react';

import { motion } from 'framer-motion';

import styles from '../styles/Modal.module.css';

import { useOutsideClick } from '../../hooks/useOutsideClick';
const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  const animationVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.3, duration: 0.1 },
    },
  };

  return createPortal(
    <motion.div
      className={styles.overlay}
      variants={animationVariants}
      initial="hidden"
      animate="visible"
    >
      <div>
        <motion.div className={styles.modal} ref={ref} variants={modalVariants}>
          <div>{cloneElement(children, { onCloseModal: close })}</div>
        </motion.div>
      </div>
    </motion.div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

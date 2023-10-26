import { createPortal } from 'react-dom';
import { cloneElement, createContext, useContext, useState } from 'react';

import { motion } from 'framer-motion';

import styles from '../styles/Modal.module.css';

import { useOutsideClick } from '@/hooks/useOutsideClick';

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

  return createPortal(
    <motion.div
      className={styles.overlay}
      transition={{ delay: 0.1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div>
        <div className={styles.modal} ref={ref}>
          <div>{cloneElement(children, { onCloseModal: close })}</div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

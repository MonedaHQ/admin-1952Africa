import { IoMdAddCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/quickActions.module.css';

function QuickActions({ action }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(action.path)} className={styles.action}>
      <IoMdAddCircle />

      <span>{action.label}</span>
    </button>
  );
}

export default QuickActions;

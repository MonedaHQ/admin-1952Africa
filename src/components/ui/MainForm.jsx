import styles from '../styles/mainform.module.css';

function MainForm({ children }) {
  return <div className={styles.main}>{children}</div>;
}

export default MainForm;

import styles from '../styles/mainform.module.css';

function MainForm({ children, layout = 'stack' }) {
  return (
    <div className={`${styles.main} ${layout === 'split' ? styles.split : ''}`}>
      {children}
    </div>
  );
}

export default MainForm;

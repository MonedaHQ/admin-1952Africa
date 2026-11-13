import styles from '../styles/loader.module.css';

function Loader({ fullScreen = true, label = 'Loading workspace' }) {
  return (
    <div
      className={`${styles.wrapper} ${fullScreen ? styles.full : styles.inline}`}
      role="status"
      aria-label={label}
    >
      <div className={styles.loaderContainer}>
        <span className={styles.loader} />
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}

export default Loader;

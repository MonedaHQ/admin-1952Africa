import styles from '../styles/loader.module.css';

function Loader({ fullScreen = true }) {
  return (
    <div className={fullScreen ? styles.full : ''}>
      <span className="loader"></span>
    </div>
  );
}

export default Loader;

import styles from './styles/Spinner.module.css';

function Spinner() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Spinner;

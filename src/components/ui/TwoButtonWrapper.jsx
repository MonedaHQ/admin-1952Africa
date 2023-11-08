import styles from '../styles/twobuttonwrapper.module.css';

function TwoButtonWrapper({ children }) {
  return <div className={styles.btnWrapper}>{children}</div>;
}

export default TwoButtonWrapper;

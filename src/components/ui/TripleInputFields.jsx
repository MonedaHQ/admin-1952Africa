import styles from '../styles/tripleinputfields.module.css';

function TripleInputFields({ children }) {
  return <div className={styles.formFields}>{children}</div>;
}

export default TripleInputFields;

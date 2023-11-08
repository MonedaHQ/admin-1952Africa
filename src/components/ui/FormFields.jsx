import styles from '../styles/formfields.module.css';

function FormFields({ children, full = false }) {
  return (
    <div
      className={`${styles.formField} ${full ? styles.full : styles.notFull}`}
    >
      {children}
    </div>
  );
}

export default FormFields;

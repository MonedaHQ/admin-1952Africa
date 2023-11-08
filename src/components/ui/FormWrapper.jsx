import styles from '../styles/formwrapper.module.css';

function FormWrapper({ children, onSubmit }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default FormWrapper;

import styles from './styles/form.module.css';

function AuthFormContainer({ children, handleSubmit, onSubmit }) {
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {children}
    </form>
  );
}

export default AuthFormContainer;

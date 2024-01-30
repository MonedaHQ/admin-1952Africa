import styles from './styles/form.module.css';

function Fields({ type, id, placeholder, label, errorMessage, formActions }) {
  const { register } = formActions;

  //   const errorMessage = errors[id]['message'];
  return (
    <fieldset className={styles.fieldset}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(id, {
          required: 'This field is required',
          minLength:
            id === 'password'
              ? {
                  value: 8,
                  message: 'Min of 8 characters',
                }
              : null,
          pattern:
            id === 'email'
              ? {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please specify a valid email',
                }
              : null,
        })}
      />
      {errorMessage && <p>{errorMessage}</p>}
    </fieldset>
  );
}

export default Fields;

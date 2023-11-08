import styles from '../styles/tripleinput.module.css';

function TripleInput({
  type,
  id,
  label,
  defaultValue,
  formActions,
  required = true,
  disabled = false,
}) {
  const { register, errors } = formActions;

  return (
    <fieldset className={styles.fieldset}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        defaultValue={defaultValue}
        disabled={disabled}
        {...register(id, {
          required: required && !disabled ? 'This field is required' : false,
          pattern: {
            value: type === 'email' ? /\S+@\S+\.\S+/ : null,
            message: type === 'email' ? 'Please specify a valid email' : null,
          },
        })}
      />
      {errors[id] && <p>{errors[id].message}</p>}
    </fieldset>
  );
}

export default TripleInput;

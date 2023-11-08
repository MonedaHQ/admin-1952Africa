import styles from './styles/formChunks.module.css';

function TextInput({
  children,
  type,
  id,
  label,
  placeholder,
  defaultValue,
  formActions,
  required = true,
}) {
  const { register, errors } = formActions;

  if (type === 'textarea')
    return (
      <fieldset className={styles.fieldset}>
        <label htmlFor={id}>{label}</label>
        <textarea
          id={id}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(id, {
            required: required ? 'This field is required' : false,
          })}
        />
        {errors[id] && <p>{errors[id].message}</p>}
      </fieldset>
    );

  if (type === 'select')
    return (
      <fieldset className={styles.fieldset}>
        <label htmlFor={id}>{label}</label>
        <select
          defaultValue={defaultValue}
          {...register(id, {
            required: required ? 'This field is required' : false,
          })}
        >
          {children}
        </select>
        {errors[id] && <p>{errors[id].message}</p>}
      </fieldset>
    );

  if (type === 'date')
    return (
      <fieldset className={styles.fieldset}>
        <label htmlFor="date">{label}</label>
        <input
          id={id}
          type={type}
          defaultValue={defaultValue}
          {...register(id, {
            required: required ? 'This field is required' : false,
          })}
        />
        {errors[id] && <p>{errors[id].message}</p>}
      </fieldset>
    );

  return (
    <fieldset className={styles.fieldset}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(id, {
          required: required ? 'This field is required' : false,
        })}
      />
      {errors[id] && <p>{errors[id].message}</p>}
    </fieldset>
  );
}

export default TextInput;

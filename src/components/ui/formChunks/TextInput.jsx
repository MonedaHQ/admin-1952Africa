import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS
import styles from './styles/formChunks.module.css';

function TextInput({
  children,
  type,
  id,
  label,
  placeholder,
  defaultValue,
  formActions,
  onChange = null,
  required = true,
  disabled = false,
  setValue = null,
}) {
  const { register, errors } = formActions;

  if (type === 'textarea') {
    return (
      <fieldset className={styles.fieldset}>
        <label htmlFor={id}>{label}</label>
        <ReactQuill
          id={id}
          placeholder={placeholder}
          value={defaultValue}
          onChange={(content) => {
            setValue(id, content);
            if (onChange) onChange(content);
          }}
          theme="snow"
          readOnly={disabled}
        />
        {errors[id] && <p>{errors[id].message}</p>}
      </fieldset>
    );
  }

  if (type === 'select') {
    let selectProps;
    if (onChange) {
      selectProps = {
        defaultValue,
        onChange,
        disabled,
        className: styles.select,
      };
    } else {
      selectProps = {
        defaultValue,

        disabled,
        className: styles.select,
      };
    }

    return (
      <fieldset className={styles.fieldset}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        {onChange && <select {...selectProps}>{children}</select>}
        {!onChange && (
          <select
            {...selectProps}
            {...register(id, {
              required: required ? 'This field is required' : false,
            })}
          >
            {children}
          </select>
        )}
        {errors[id] && <p className={styles.warning}>{errors[id].message}</p>}
      </fieldset>
    );
  }

  if (type === 'date')
    return (
      <fieldset className={styles.fieldset}>
        <label htmlFor="date">{label}</label>
        <input
          id={id}
          type={type}
          defaultValue={defaultValue}
          onChange={onChange}
          {...register(id, {
            required: required ? 'This field is required' : false,
          })}
          disabled={disabled}
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
        onChange={onChange}
        {...register(id, {
          required: required ? 'This field is required' : false,
        })}
        disabled={disabled}
      />
      {errors[id] && <p>{errors[id].message}</p>}
    </fieldset>
  );
}

export default TextInput;

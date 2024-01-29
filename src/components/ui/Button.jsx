import { Link } from 'react-router-dom';
import styles from '../styles/Button.module.css';

function Button({
  children,
  variant,
  onClick = null,
  href = null,
  type = 'button',
  disabled,
}) {
  if (variant.includes('link') || variant.startsWith('link')) {
    const classname = variant.split('-').at(1);
    return (
      <div className={`${styles.box} ${styles[classname]}`}>
        {onClick ? (
          <button
            className={`${styles.button} ${styles[variant]}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
          >
            {children}
          </button>
        ) : (
          <button
            className={`${styles.button} ${styles[variant]}`}
            type={type}
            disabled={disabled}
          >
            <Link href={href}>{children}</Link>
          </button>
        )}
      </div>
    );
  }

  if (href)
    return (
      <button
        className={`${styles.button} ${styles[variant]}`}
        type={type}
        disabled={disabled}
      >
        <a href={href}>{children}</a>
      </button>
    );

  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;

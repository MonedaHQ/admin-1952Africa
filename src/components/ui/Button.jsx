import styles from '../styles/Button.module.css';

function Button({
  children,
  variant,
  onClick = null,
  href = null,
  type = 'button',
}) {
  if (variant === 'link-white' || variant === 'link-dark') {
    return (
      <div
        className={`${styles.box} ${
          variant === 'link-white' ? styles.boxWhite : styles.boxDark
        }`}
      >
        {onClick ? (
          <button
            className={`${styles.button} ${styles[variant]}`}
            onClick={onClick}
            type={type}
          >
            {children}
          </button>
        ) : (
          <button className={`${styles.button} ${styles[variant]}`} type={type}>
            <a href={href}>{children}</a>
          </button>
        )}
      </div>
    );
  }

  if (href)
    return (
      <button className={`${styles.button} ${styles[variant]}`} type={type}>
        <a href={href}>{children}</a>
      </button>
    );

  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

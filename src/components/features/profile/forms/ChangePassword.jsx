import Button from '../../../ui/Button';
import styles from '../styles/form.module.css';

function ChangePassword() {
  return (
    <section className={styles.section}>
      <h3>Change password</h3>
      <form className={styles.form}>
        <div className={styles.formFields}>
          <fieldset className={styles.fieldset}>
            <label htmlFor="current_password">Current password</label>
            <input type="password" id="current_password" />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <label htmlFor="new_password">New password</label>
            <input type="password" id="new_password" />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <label htmlFor="new_passwordConfirm">Confirm password</label>
            <input type="password" id="new_passwordConfirm" />
          </fieldset>
        </div>
        <div className={styles.btnWrapper}>
          <Button variant="primary">Save changes</Button>
          <Button variant="link-white">Cancel</Button>
        </div>
      </form>
    </section>
  );
}

export default ChangePassword;

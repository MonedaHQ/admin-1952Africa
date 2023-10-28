import Button from '../../../ui/Button';
import styles from '../styles/form.module.css';

function PersonalInfo() {
  return (
    <section className={styles.section}>
      <h3>Personal information</h3>
      <form className={styles.form}>
        <div className={styles.formFields}>
          <fieldset className={styles.fieldset}>
            <label htmlFor="first_name">First name</label>
            <input type="text" id="first_name" value="Toyin" />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <label htmlFor="last_name">Last name</label>
            <input type="text" id="last_name" value="Oke" />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <label htmlFor="last_name">E-mail</label>
            <input
              type="email"
              id="email"
              value="o.oluwatoyin@1952africa.com"
              disabled
            />
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

export default PersonalInfo;

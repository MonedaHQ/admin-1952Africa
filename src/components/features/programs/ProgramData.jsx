import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import styles from './styles/addprograms.module.css';

function ProgramData() {
  const navigate = useNavigate();
  return (
    <form className={styles.form}>
      <div className={styles.formField}>
        <fieldset className={styles.fieldset}>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" placeholder="Program name" />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Brief description of program"
          />
        </fieldset>
      </div>
      <div className={styles.btnWrapper}>
        <Button variant="primary">Add</Button>
        <Button variant="link-warn" type="button" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default ProgramData;

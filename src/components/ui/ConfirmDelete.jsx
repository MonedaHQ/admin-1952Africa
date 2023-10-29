import styles from '../styles/confirmDelete.module.css';
import Button from './Button';

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className={styles.container}>
      <h4>Remove {resourceName}?</h4>
      <p>
        Are you sure you want to delete {resourceName}{' '}
        <strong>permanently</strong>? This action cannot be undone
      </p>
      <div className={styles.btnWrapper}>
        <Button
          variant="delete"
          disabled={disabled}
          onClick={() => {
            onConfirm();
            onCloseModal();
          }}
        >
          Delete
        </Button>
        <Button variant="link-dark" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;

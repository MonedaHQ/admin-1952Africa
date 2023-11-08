import styles from '../styles/confirmDelete.module.css';
import Button from './Button';

function ConfirmDelete({
  resourceName,
  action = 'delete',
  onConfirm,
  disabled,
  onCloseModal,
}) {
  return (
    <div className={styles.container}>
      <h4>{action === 'delete' ? `Remove ${resourceName}?` : 'Sign out'}</h4>
      <p>
        {action === 'delete' &&
          `Are you sure you want to delete ${resourceName}
        permanently? This action cannot be undone`}
        {action === 'signout' && `Are you sure you want to sign out?`}
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
          {action === 'delete' ? 'Delete' : 'Sign out'}
        </Button>
        <Button variant="link-dark" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;

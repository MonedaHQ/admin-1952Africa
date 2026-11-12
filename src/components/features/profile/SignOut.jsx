import { useNavigate } from 'react-router-dom';

import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteUser } from '../users/useDeleteUser';
import styles from './styles/profile.module.css';

function SignOut() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));

  const { id, token } = currentUser;

  const isAdmin =
    currentUser.role.toLowerCase() === 'admin' ||
    currentUser.role.toLowerCase() === 'superadmin';

  const { deleteUser } = useDeleteUser();

  function handleSignout() {
    localStorage.removeItem('1952adminUser');
    navigate('/');
  }

  function handleDeleteAccount() {
    deleteUser(
      { id, token },
      {
        onSuccess: () => {
          localStorage.removeItem('1952adminUser');
          navigate('/');
        },
      }
    );
  }

  return (
    <div className={styles.accountActions}>
      <div>
        <h3>Account actions</h3>
        <p>Sign out of this session or permanently remove your account.</p>
      </div>
      <Modal>
        <div className={styles.accountButtons}>
          <Modal.Open opens="signout">
            <Button variant="primary-reverse">Sign out</Button>
          </Modal.Open>
          {isAdmin && (
            <Modal.Open opens="deleteAccount">
              <Button variant="link-warn">Delete account</Button>
            </Modal.Open>
          )}
        </div>
        <Modal.Window name="signout">
          <ConfirmDelete action="signout" onConfirm={handleSignout} />
        </Modal.Window>
        <Modal.Window name="deleteAccount">
          <ConfirmDelete
            action="delete"
            onConfirm={handleDeleteAccount}
            resourceName="your account"
          />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default SignOut;

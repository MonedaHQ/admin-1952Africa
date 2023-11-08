import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Modal from '../../ui/Modal';

function SignOut() {
  const navigate = useNavigate();

  function handleSignout() {
    navigate('/');
  }
  return (
    <div>
      <Modal>
        <Modal.Open opens="signout">
          <Button variant="delete">Sign out</Button>
        </Modal.Open>
        <Modal.Window name="signout">
          <ConfirmDelete action="signout" onConfirm={handleSignout} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default SignOut;

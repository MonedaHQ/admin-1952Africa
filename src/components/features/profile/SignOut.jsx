import { useNavigate } from 'react-router-dom';

import { usersData } from '../../../data/programsData';

import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import ConfirmDelete from '../../ui/ConfirmDelete';
import TwoButtonWrapper from '../../ui/TwoButtonWrapper';

function SignOut() {
  const navigate = useNavigate();
  const isAdmin = usersData.find(
    (user) => user.authenticated && user.role === 'admin'
  );

  function handleSignout() {
    localStorage.removeItem('1952adminUser');
    navigate('/');
  }
  return (
    <TwoButtonWrapper>
      <Modal>
        <Modal.Open opens="signout">
          <Button variant="delete">Sign out</Button>
        </Modal.Open>
        {isAdmin && (
          <Modal.Open opens="deleteAccount">
            <Button variant="link-warn">Delete account</Button>
          </Modal.Open>
        )}
        <Modal.Window name="signout">
          <ConfirmDelete action="signout" onConfirm={handleSignout} />
        </Modal.Window>
        <Modal.Window name="deleteAccount">
          <ConfirmDelete
            action="delete"
            onConfirm={handleSignout}
            resourceName="your account"
          />
        </Modal.Window>
      </Modal>
    </TwoButtonWrapper>
  );
}

export default SignOut;

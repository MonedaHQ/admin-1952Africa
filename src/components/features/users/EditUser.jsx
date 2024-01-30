import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import FormWrapper from '../../ui/FormWrapper';
import FormFields from '../../ui/FormFields';
import TextInput from '../../ui/formChunks/TextInput';
import TwoButtonWrapper from '../../ui/TwoButtonWrapper';
import Button from '../../ui/Button';
import { useCreateUser } from './useCreateUser';
import { useState } from 'react';
import { useUpgradeUserRole } from './useUserRoleUpgrade';

function EditUser({ user = null, isSuperAdmin = false }) {
  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const { upgradeUser } = useUpgradeUserRole();

  const [isWorking, setIsWorking] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));

  const { createUser } = useCreateUser();

  const isAdmin =
    currentUser.role.toLowerCase() === 'admin' ||
    currentUser.role.toLowerCase() === 'superadmin';

  const formActions = { register, errors };

  function onSubmit(data) {
    setIsWorking(true);

    let update;
    if (id) {
      update = {
        role: data.role,
        user_type: data.role === 'SuperAdmin' ? 'Admin' : null,
      };
      upgradeUser({ payload: update, id, token: currentUser.token });
    } else {
      update = data;
      createUser(
        { update, token: currentUser.token },
        { onSettled: () => setIsWorking(false) }
      );
    }
  }
  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormFields>
        <TextInput
          type="text"
          id="first_name"
          label="First Name"
          defaultValue={user ? user.first_name : ''}
          formActions={formActions}
          disabled={user ? true : false}
          required={user ? false : true}
        />
        <TextInput
          type="text"
          id="last_name"
          label="Last Name"
          defaultValue={user ? user.last_name : ''}
          formActions={formActions}
          disabled={user ? true : false}
          required={user ? false : true}
        />
        <TextInput
          type="text"
          id="email"
          label="E-mail"
          defaultValue={user ? user.email : ''}
          formActions={formActions}
          disabled={user ? true : false}
          required={user ? false : true}
        />
        {(isSuperAdmin || !isAdmin) && (
          <TextInput
            type="select"
            id="role"
            label="Role"
            defaultValue={user ? user.role : ''}
            formActions={formActions}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            {isSuperAdmin && <option value="SuperAdmin">Super Admin</option>}
          </TextInput>
        )}
      </FormFields>
      <TwoButtonWrapper>
        <Button variant="primary" type="submit" disabled={isWorking}>
          {isWorking ? 'Updating..' : 'Save'}
        </Button>
        <Button variant="link-warn" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </TwoButtonWrapper>
    </FormWrapper>
  );
}

export default EditUser;

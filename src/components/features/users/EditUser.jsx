import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import FormWrapper from '../../ui/FormWrapper';
import FormFields from '../../ui/FormFields';
import TextInput from '../../ui/formChunks/TextInput';
import TwoButtonWrapper from '../../ui/TwoButtonWrapper';
import Button from '../../ui/Button';
import { useCreateUser } from './useCreateUser';
import { useState } from 'react';

function EditUser({ user = null }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const [isWorking, setIsWorking] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));

  const { createUser } = useCreateUser();

  const isAdmin = user?.role === 'admin' || false;

  const formActions = { register, errors };

  function onSubmit(data) {
    setIsWorking(true);

    let update;
    if (data.first_name === undefined) {
      update = { role: data.role };
    } else {
      update = data;
    }

    // console.log(update);

    if (!user) {
      createUser(
        { data: update, token: currentUser.token },
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
        {!isAdmin && (
          <TextInput
            type="select"
            id="role"
            label="Role"
            defaultValue={user ? user.role : ''}
            formActions={formActions}
          >
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </TextInput>
        )}
      </FormFields>
      <TwoButtonWrapper>
        <Button variant="primary" type="submit" disabled={isWorking}>
          {isWorking ? 'Updating..' : 'Save'}
        </Button>
        <Button variant="link-dark" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </TwoButtonWrapper>
    </FormWrapper>
  );
}

export default EditUser;

import { useForm } from 'react-hook-form';

import Section from '../../../ui/Section';
import FormWrapper from '../../../ui/FormWrapper';
import TripleInput from '../../../ui/TripleInput';
import TripleInputFields from '../../../ui/TripleInputFields';
import TwoButtonWrapper from '../../../ui/TwoButtonWrapper';
import Button from '../../../ui/Button';
import { useUpdateUser } from '../useUpdateUser';
import { getCurrentUser } from '../../../../services/apiUser';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PersonalInfo({ user }) {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { updateUser } = useUpdateUser();

  const { first_name, last_name, email, token, id } = user;

  function onSubmit(data) {
    setIsUpdating(true);
    const newData = { first_name: data.first_name, last_name: data.last_name };
    updateUser(
      { data: newData, token },
      {
        onSettled: async () => {
          const currentUser = await getCurrentUser(id, token);

          localStorage.setItem(
            '1952adminUser',
            JSON.stringify({ ...user, ...currentUser })
          );

          setIsUpdating(false);
          navigate('/home');
        },
      }
    );
  }

  return (
    <Section>
      <h3>Personal information</h3>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <TripleInputFields>
          <TripleInput
            type="text"
            id="first_name"
            label="First name"
            defaultValue={user ? first_name : ''}
            formActions={{ register, errors }}
          />
          <TripleInput
            type="text"
            id="last_name"
            label="Last name"
            defaultValue={user ? last_name : ''}
            formActions={{ register, errors }}
          />
          <TripleInput
            type="email"
            id="email"
            label="E-mail"
            defaultValue={user ? email : ''}
            formActions={{ register, errors }}
            disabled={true}
          />
        </TripleInputFields>
        <TwoButtonWrapper>
          <Button variant="primary" type="submit" disabled={isUpdating}>
            {isUpdating ? 'Updating..' : 'Save'}
          </Button>
          <Button variant="link-warn" onClick={() => reset()}>
            Cancel
          </Button>
        </TwoButtonWrapper>
      </FormWrapper>
    </Section>
  );
}

export default PersonalInfo;

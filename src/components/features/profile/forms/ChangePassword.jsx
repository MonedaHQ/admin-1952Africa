import { useForm } from 'react-hook-form';

import Section from '../../../ui/Section';
import FormWrapper from '../../../ui/FormWrapper';
import TripleInputFields from '../../../ui/TripleInputFields';
import TripleInput from '../../../ui/TripleInput';
import TwoButtonWrapper from '../../../ui/TwoButtonWrapper';
import Button from '../../../ui/Button';
import { useChangePassword } from '../useChangePassword';
import { useState } from 'react';

function ChangePassword() {
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
  const user = JSON.parse(localStorage.getItem('1952adminUser'));

  const { register, formState, handleSubmit, reset, getValues } = useForm();
  const { errors } = formState;

  const { changePassword } = useChangePassword();

  function onSubmit(data) {
    setIsPasswordUpdating(true);
    const newData = { ...data };

    changePassword(
      { data: newData, token: user.token },
      {
        onSettled: () => {
          reset();
          setIsPasswordUpdating(false);
        },
      }
    );
  }
  return (
    <Section>
      <h3>Change password</h3>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <TripleInputFields>
          <TripleInput
            type="password"
            id="old_password"
            label="Current password"
            defaultValue=""
            formActions={{ register, errors }}
          />
          <TripleInput
            type="password"
            id="password"
            label="New password"
            defaultValue=""
            formActions={{ register, errors }}
          />
          <TripleInput
            type="password"
            id="password_confirmation"
            label="Confirm password"
            defaultValue=""
            formActions={{ register, errors }}
            getValues={getValues}
          />
        </TripleInputFields>
        <TwoButtonWrapper>
          <Button variant="primary" type="submit" disabled={isPasswordUpdating}>
            {isPasswordUpdating ? 'Updating...' : 'Save'}
          </Button>
          <Button variant="link-warn" onClick={() => reset()}>
            Cancel
          </Button>
        </TwoButtonWrapper>
      </FormWrapper>
    </Section>
  );
}

export default ChangePassword;

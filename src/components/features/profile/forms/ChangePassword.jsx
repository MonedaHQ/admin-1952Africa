import { useForm } from 'react-hook-form';

import Section from '../../../ui/Section';
import FormWrapper from '../../../ui/FormWrapper';
import TripleInputFields from '../../../ui/TripleInputFields';
import TripleInput from '../../../ui/TripleInput';
import TwoButtonWrapper from '../../../ui/TwoButtonWrapper';
import Button from '../../../ui/Button';

function ChangePassword() {
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    const newData = { ...data, email: null };
    console.log(newData);
  }
  return (
    <Section>
      <h3>Change password</h3>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <TripleInputFields>
          <TripleInput
            type="password"
            id="current_password"
            label="Current password"
            defaultValue=""
            formActions={{ register, errors }}
          />
          <TripleInput
            type="password"
            id="new_password"
            label="New password"
            defaultValue=""
            formActions={{ register, errors }}
          />
          <TripleInput
            type="password"
            id="new_passwordConfirm"
            label="Confirm password"
            defaultValue=""
            formActions={{ register, errors }}
          />
        </TripleInputFields>
        <TwoButtonWrapper>
          <Button variant="primary" type="submit">
            Save
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

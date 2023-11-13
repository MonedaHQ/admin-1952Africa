import { useForm } from 'react-hook-form';

import Section from '../../../ui/Section';
import FormWrapper from '../../../ui/FormWrapper';
import TripleInput from '../../../ui/TripleInput';
import TripleInputFields from '../../../ui/TripleInputFields';
import TwoButtonWrapper from '../../../ui/TwoButtonWrapper';
import Button from '../../../ui/Button';

function PersonalInfo({ user }) {
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { first_name, last_name, email } = user;

  function onSubmit(data) {
    const newData = { ...data, email: null };
    console.log(newData);
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

export default PersonalInfo;

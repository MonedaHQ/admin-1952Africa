import { useForm } from 'react-hook-form';
import Button from '../../../ui/Button';
import TripleInputFields from '../../../ui/TripleInputFields';
import styles from '../styles/form.module.css';
import TripleInput from '../../../ui/TripleInput';
import FormWrapper from '../../../ui/FormWrapper';
import TwoButtonWrapper from '../../../ui/TwoButtonWrapper';

function PersonalInfo() {
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    const newData = { ...data, email: null };
    console.log(newData);
  }

  return (
    <section className={styles.section}>
      <h3>Personal information</h3>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <TripleInputFields>
          <TripleInput
            type="text"
            id="first_name"
            label="First name"
            defaultValue="Toyin"
            formActions={{ register, errors }}
          />
          <TripleInput
            type="text"
            id="last_name"
            label="Last name"
            defaultValue="Oke"
            formActions={{ register, errors }}
          />
          <TripleInput
            type="email"
            id="email"
            label="E-mail"
            defaultValue="o.oluwatoyin@1952africa.art"
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
    </section>
  );
}

export default PersonalInfo;

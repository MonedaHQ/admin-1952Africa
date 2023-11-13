import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import FormWrapper from '../../ui/FormWrapper';
import FormFields from '../../ui/FormFields';
import TextInput from '../../ui/formChunks/TextInput';
import TwoButtonWrapper from '../../ui/TwoButtonWrapper';
import Button from '../../ui/Button';

function ExhibitionForm({ exhibition = null }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const formActions = { register, errors };

  function onSubmit(data) {
    console.log(data);
  }
  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormFields>
        <TextInput
          type="text"
          id="title"
          label="Title"
          placeholder="Exhibition title"
          defaultValue={exhibition ? exhibition.title : ''}
          formActions={formActions}
        />
        <TextInput
          type="textarea"
          id="description"
          label="Description"
          placeholder="Brief description of the exhibition"
          defaultValue={exhibition ? exhibition.description : ''}
          formActions={formActions}
        />
        <TextInput
          type="number"
          id="year"
          label="Year"
          defaultValue={exhibition ? exhibition.year : ''}
          formActions={formActions}
        />
      </FormFields>
      <TwoButtonWrapper>
        <Button variant="primary" type="submit">
          Save
        </Button>
        <Button variant="link-dark" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </TwoButtonWrapper>
    </FormWrapper>
  );
}

export default ExhibitionForm;

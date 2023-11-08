import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../ui/Button';
import { programData } from '../../../data/programsData';
import TextInput from '../../ui/formChunks/TextInput';
import TwoButtonWrapper from '../../ui/TwoButtonWrapper';
import FormFields from '../../ui/FormFields';
import FormWrapper from '../../ui/FormWrapper';
import { useForm } from 'react-hook-form';

function ProgramData() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const { register, formState, reset, handleSubmit } = useForm();

  const { errors } = formState;

  let program = null;

  if (slug) {
    program = programData.find((program) => program.slug === slug);
  }

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormFields>
        <TextInput
          id="title"
          defaultValue={program ? program.title : null}
          type="text"
          placeholder="Program Title"
          label="Title"
          formActions={{ register, errors }}
        />
        <TextInput
          id="description"
          defaultValue={program ? program.description : null}
          type="textarea"
          placeholder="Brief description of the program"
          label="Description"
          formActions={{ register, errors }}
        />
      </FormFields>
      <TwoButtonWrapper>
        <Button variant="primary" type="submit">
          {program ? 'Save' : 'Add'}
        </Button>
        <Button variant="link-warn" type="button" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </TwoButtonWrapper>
    </FormWrapper>
  );
}

export default ProgramData;

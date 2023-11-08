import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { programData } from '../../../data/programsData';

import FormWrapper from '../../ui/FormWrapper';
import FormFields from '../../ui/FormFields';
import TextInput from '../../ui/formChunks/TextInput';
import TwoButtonWrapper from '../../ui/TwoButtonWrapper';
import Button from '../../ui/Button';

function EditActivity({ activity }) {
  const navigate = useNavigate();
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  const programs = programData.map((program) => ({
    programTitle: program.title,
    id: program.id,
  }));

  const currentProgram = activity
    ? programs.find((curProgram) => curProgram.id === activity.program)
    : null;

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
          placeholder="Acitivity Title"
          defaultValue={activity ? activity.title : ''}
          formActions={{ register, errors }}
          required={true}
        />
        <TextInput
          type="text"
          id="video_url"
          label="Video url"
          placeholder="www.youtube.com/activity_title"
          defaultValue={activity ? activity.video_url : ''}
          formActions={{ register, errors }}
          required={true}
        />
        <TextInput
          type="select"
          id="program"
          label="Program"
          placeholder=""
          defaultValue={currentProgram ? currentProgram.programTitle : null}
          formActions={{ register, errors }}
          required={true}
        >
          {programs.map((program) => (
            <option value={program.programTitle} key={program.id}>
              {program.programTitle}
            </option>
          ))}
        </TextInput>
        <TextInput
          type="date"
          id="date"
          label="Date"
          placeholder=""
          defaultValue={activity ? activity.date : null}
          formActions={{ register, errors }}
          required={true}
        />
        <TextInput
          type="textarea"
          id="description"
          label="Description"
          placeholder="Brief description of the activity"
          defaultValue={activity ? activity.description : ''}
          formActions={{ register, errors }}
          required={true}
        />
      </FormFields>
      <TwoButtonWrapper>
        <Button variant="primary" type="submit">
          Save changes
        </Button>
        <Button variant="link-dark" type="button" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </TwoButtonWrapper>
    </FormWrapper>
  );
}

export default EditActivity;

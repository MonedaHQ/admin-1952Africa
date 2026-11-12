import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import FormWrapper from '../../ui/FormWrapper';
import FormFields from '../../ui/FormFields';
import TextInput from '../../ui/formChunks/TextInput';
import TwoButtonWrapper from '../../ui/TwoButtonWrapper';
import Button from '../../ui/Button';
import CoverImageInput from '../../ui/CoverImageInput';
import { useState } from 'react';
import { usePrograms } from '../programs/usePrograms';
import { useCreateActivity } from './useCreateActivity';
import { useUpdateActivity } from './useUpdateActivity';

function EditActivity({ activity, add = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, formState, handleSubmit, setValue } = useForm();
  const { errors } = formState;

  const [file, setFile] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));

  const token = currentUser.token;

  const { programs, isLoading } = usePrograms(token);

  const { createActivity } = useCreateActivity();
  const { updateActivity } = useUpdateActivity();

  if (isLoading) return;

  const currentProgram = activity
    ? programs.data.find((curProgram) => curProgram.id === activity.program)
    : null;

  function onSubmit(data) {
    setIsCreating(true);

    if (add) {
      const formattedData = {
        ...data,
        program_id:
          programs.data.find(
            (program) =>
              program.title.trim().toLowerCase() ===
              data.program.trim().toLowerCase()
          )?.id || null,
        date: new Date(data.date).toISOString(),
        file,
      };

      createActivity(
        { form: formattedData, token },
        { onSettled: () => setIsCreating(false) }
      );
    } else {
      updateActivity(
        { data, id, token },
        { onSettled: () => setIsCreating(false) }
      );
    }
  }

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      {add && (
        <CoverImageInput
          register={register}
          id="file"
          setValue={setValue}
          handleImage={setFile}
          disabled={isCreating}
        >
          {`Replac${isCreating ? 'ing...' : 'e'}`}
        </CoverImageInput>
      )}
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
        {add && (
          <TextInput
            type="select"
            id="program"
            label="Program"
            placeholder=""
            defaultValue={currentProgram ? currentProgram.title : null}
            formActions={{ register, errors }}
            required={true}
          >
            {programs.data.map((program) => (
              <option value={program.title} key={program.id}>
                {program.title}
              </option>
            ))}
          </TextInput>
        )}
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
          setValue={setValue}
          required={true}
        />
      </FormFields>
      <TwoButtonWrapper>
        <Button variant="primary" type="submit" disabled={isCreating}>
          {isCreating ? 'Saving...' : 'Save changes'}
        </Button>
        <Button variant="link-warn" type="button" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </TwoButtonWrapper>
    </FormWrapper>
  );
}

export default EditActivity;

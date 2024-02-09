import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import FormWrapper from '../../ui/FormWrapper';
import FormFields from '../../ui/FormFields';
import TextInput from '../../ui/formChunks/TextInput';
import TwoButtonWrapper from '../../ui/TwoButtonWrapper';
import Button from '../../ui/Button';
import { useState } from 'react';
import { useCreateProgram } from './useCreateProgram';
import { usePrograms } from './usePrograms';
import { useUpdateProgram } from './useUpdateProgram';
import CoverImageInput from '../../ui/CoverImageInput';

function ProgramData({ add = true }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));

  const [file, setFile] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const { createProgram } = useCreateProgram();
  const { updateProgram } = useUpdateProgram();

  const { register, formState, handleSubmit, setValue } = useForm();

  const { errors } = formState;

  const { token } = currentUser;

  const { programs, isLoading } = usePrograms(token);

  if (isLoading) return;

  let program = null;

  if (id) {
    program = programs.data.find((program) => program.id === id);
  }

  function onSubmit(data) {
    setIsCreating(true);
    if (!id) {
      const form = { ...data, file };
      createProgram({ form, token }, { onSettled: () => setIsCreating(false) });
    } else if (id && file === null) {
      updateProgram(
        { payload: data, id, token },
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
        <Button variant="primary" type="submit" disabled={isCreating}>
          {`${program ? 'Save' : 'Add'}${isCreating ? '...' : ''}`}
        </Button>
        <Button variant="link-warn" type="button" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </TwoButtonWrapper>
    </FormWrapper>
  );
}

export default ProgramData;

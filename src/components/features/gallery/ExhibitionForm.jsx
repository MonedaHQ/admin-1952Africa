import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import FormWrapper from '../../ui/FormWrapper';
import FormFields from '../../ui/FormFields';
import TextInput from '../../ui/formChunks/TextInput';
import TwoButtonWrapper from '../../ui/TwoButtonWrapper';
import Button from '../../ui/Button';
import CoverImageInput from '../../ui/CoverImageInput';
import { useState } from 'react';
import { useCreateExhibition } from './useCreateExhibition';
import { useUpdateExbition } from './useUpdateExhibition';

function ExhibitionForm({ exhibition = null, add = false }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  const { id } = useParams();

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));

  const [file, setFile] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // const {exhibition}
  const { createExhibition } = useCreateExhibition();
  const { updateExhibition } = useUpdateExbition();

  const { token } = currentUser;

  const formActions = { register, errors };

  function onSubmit(data) {
    setIsCreating(true);
    if (!id) {
      const form = { ...data, file };
      createExhibition(
        { form, token },
        { onSettled: () => setIsCreating(false) }
      );
    } else if (id && file === null) {
      updateExhibition(
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
          type="text"
          id="title"
          label="Title"
          placeholder="Exhibition title"
          defaultValue={exhibition ? exhibition.title : ''}
          formActions={formActions}
        />

        <TextInput
          type="number"
          id="year"
          label="Year"
          defaultValue={exhibition ? exhibition.year : ''}
          formActions={formActions}
        />
        <TextInput
          type="textarea"
          id="description"
          label="Description"
          placeholder="Brief description of the exhibition"
          defaultValue={exhibition ? exhibition.description : ''}
          formActions={formActions}
          setValue={setValue}
        />
      </FormFields>
      <TwoButtonWrapper>
        <Button variant="primary" type="submit" disabled={isCreating}>
          {`Sav${isCreating ? 'ing...' : 'e'}`}
        </Button>
        <Button variant="link-dark" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </TwoButtonWrapper>
    </FormWrapper>
  );
}

export default ExhibitionForm;

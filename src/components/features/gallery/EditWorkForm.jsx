import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { exhibitionData, works } from '../../../data/programsData';

import FormWrapper from '../../ui/FormWrapper';
import FormFields from '../../ui/FormFields';
import TextInput from '../../ui/formChunks/TextInput';
import TwoButtonWrapper from '../../ui/TwoButtonWrapper';
import Button from '../../ui/Button';
import { useCreateWork } from './useCreateWork';
import CoverImageInput from '../../ui/CoverImageInput';
import { useState } from 'react';

function EditWorkForm({ add = false, fullImage = false }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { register, formState, handleSubmit, setValue } = useForm();
  const { errors } = formState;

  const [file, setFile] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const { id, token } = currentUser;

  let work = null;
  let currentExhibition = null;

  const { createWork } = useCreateWork();

  if (slug) {
    const currentWork = works?.find((work) => work.slug === slug);
    work = {
      ...currentWork,
    };
  }

  //Get all exhibitions
  const allExhibitions = exhibitionData?.map((exhibition) => {
    return {
      exhibitionId: exhibition.id,
      exhibitionTitle: exhibition.title,
    };
  });
  if (slug) {
    //Get the current exhibition
    currentExhibition = work?.exhibition
      ? allExhibitions.find(
          (exhibition) => exhibition.exhibitionId === work.exhibition
        ).exhibitionTitle
      : '';
  }

  const formActions = { register, errors };

  function onSubmit(data) {
    setIsCreating(true);
    if (!id) {
      console.log(data);
      // const form = { ...data, file };
      // createWork({ form, token }, { onSettled: () => setIsCreating(false) });
    } else if (id && file === null) {
      // createWork(
      //   { payload: data, id, token },
      //   { onSettled: () => setIsCreating(false) }
      // );
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
          fullImage={fullImage}
        >
          {`Replac${isCreating ? 'ing...' : 'e'}`}
        </CoverImageInput>
      )}
      <FormFields onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          type="text"
          id="title"
          label="Title"
          placeholder="Work title"
          defaultValue={work ? work.art_title : ''}
          formActions={formActions}
        />
        <TextInput
          type="text"
          id="artist_name"
          label="Artist"
          placeholder="Artist Name"
          defaultValue={work ? work.artist_name : ''}
          formActions={formActions}
        />
        <TextInput
          type="text"
          id="medium"
          label="Medium"
          placeholder="Medium"
          defaultValue={work ? work.medium : ''}
          formActions={formActions}
        />
        <TextInput
          type="text"
          id="canvas_size"
          label="Canvas Size"
          placeholder="Canvas Size"
          defaultValue={work ? work.canvas_size : ''}
          formActions={formActions}
        />
        <TextInput
          type="text"
          id="video_url"
          label="Video Url"
          placeholder="www.youtube.com/video_url"
          defaultValue={work ? work.video_url : ''}
          formActions={formActions}
        />
        <TextInput
          type="select"
          id="exhibition"
          label="Exhibition"
          defaultValue={currentExhibition}
          formActions={formActions}
        >
          {allExhibitions.map((exhibition) => (
            <option
              key={exhibition.exhibitionId}
              value={exhibition.exhibitionTitle}
            >
              {exhibition.exhibitionTitle}
            </option>
          ))}
        </TextInput>
        <TextInput
          type="select"
          id="is_available"
          label="Is this piece available?"
          defaultValue={work ? work.isAvailable : ''}
          formActions={formActions}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </TextInput>
        <TextInput
          type="number"
          id="value"
          label="Value (in USD)"
          placeholder="8000"
          defaultValue={work ? work.video_url : ''}
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

export default EditWorkForm;

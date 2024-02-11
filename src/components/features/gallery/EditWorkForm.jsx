import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import FormWrapper from '../../ui/FormWrapper';
import FormFields from '../../ui/FormFields';
import TextInput from '../../ui/formChunks/TextInput';
import TwoButtonWrapper from '../../ui/TwoButtonWrapper';
import Button from '../../ui/Button';
import { useCreateWork } from './useCreateWork';
import CoverImageInput from '../../ui/CoverImageInput';
import { useState } from 'react';
import { useArtistData } from '../artists/useArtistData';
import { useExhibitionData } from './useExhibitionData';
import { useWork } from './useWork';
import { useRefreshData } from '../../../hooks/useRefreshData';
import Loader from '../../ui/Loader';
import { useUpdateWork } from './useUpdateWork';

function EditWorkForm({ add = false, fullImage = false }) {
  const { id } = useParams();

  const navigate = useNavigate();
  const { register, formState, handleSubmit, setValue } = useForm();
  const { errors } = formState;

  const [file, setFile] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const { token } = currentUser;

  let currentExhibition = null;

  const { createWork } = useCreateWork();

  const { work, isLoadingWork, refetchWork } = useWork(id);
  const { updateWork } = useUpdateWork();

  const { artistData, isLoading: isLoadingArtists } = useArtistData(token);

  //Get all exhibitions
  const { exhibitionData, isLoading: isLoadingExhibition } =
    useExhibitionData(token);

  const isReloading = useRefreshData(2000);

  if (
    isReloading ||
    isLoadingArtists ||
    isLoadingExhibition ||
    (id && isLoadingWork)
  )
    return <Loader />;

  const formActions = { register, errors };

  function onSubmit(data) {
    setIsCreating(true);
    let form;
    if (!id) {
      form = {
        ...data,
        value: +data.value,
        is_available: data.is_available === 'true' ? true : false,
        value_currency: 'USD',
        file,
      };
      createWork({ form, token }, { onSettled: () => setIsCreating(false) });
    } else if (id && file === null) {
      form = {
        ...data,
        value: +data.value,
        is_available: data.is_available === 'true' ? true : false,
        value_currency: 'USD',
      };

      updateWork(
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
          defaultValue={!add ? work.title : ''}
          formActions={formActions}
        />
        <TextInput
          type="text"
          id="medium"
          label="Medium"
          placeholder="Medium"
          defaultValue={!add ? work.medium : ''}
          formActions={formActions}
        />
        <TextInput
          type="text"
          id="canvas_size"
          label="Canvas Size"
          placeholder="Canvas Size"
          defaultValue={!add ? work.canvas_size : ''}
          formActions={formActions}
        />
        <TextInput
          type="text"
          id="video_url"
          label="Video Url"
          placeholder="www.youtube.com/video_url"
          defaultValue={!add ? work.video_url : ''}
          formActions={formActions}
        />
        <TextInput
          type="select"
          id="exhibition_id"
          label="Exhibition"
          defaultValue={!add ? work.exhibition_id : ''}
          formActions={formActions}
        >
          {exhibitionData?.map((exhibition) => (
            <option key={exhibition.id} value={exhibition.id}>
              {exhibition.title}
            </option>
          ))}
        </TextInput>
        <TextInput
          type="select"
          id="artist_id"
          label="Artist"
          defaultValue={!add ? work.artist_id : ''}
          formActions={formActions}
        >
          {artistData?.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.first_name} {artist.last_name}
            </option>
          ))}
        </TextInput>

        <TextInput
          type="select"
          id="is_available"
          label="Is this piece available?"
          defaultValue={!add ? work.is_available : ''}
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
          defaultValue={!add ? work.value : ''}
          formActions={formActions}
        />
      </FormFields>
      <TwoButtonWrapper>
        <Button variant="primary" type="submit" disabled={isCreating}>
          {`Sav${isCreating ? 'ing...' : 'e'}`}
        </Button>
        <Button variant="link-warn" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </TwoButtonWrapper>
    </FormWrapper>
  );
}

export default EditWorkForm;

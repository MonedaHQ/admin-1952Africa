import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import FormWrapper from '../../ui/FormWrapper';
import FormFields from '../../ui/FormFields';
import TextInput from '../../ui/formChunks/TextInput';
import TwoButtonWrapper from '../../ui/TwoButtonWrapper';
import Button from '../../ui/Button';
import { useEffect, useState } from 'react';
import CoverImageInput from '../../ui/CoverImageInput';
import { useProgramData } from '../programs/useProgramData';
import { useCreateArtist } from './useCreateArtist';
import { useUpdateArtist } from './useUpdateArtist';
import { useActivityData } from '../activities/useActivityData';
import { getActivityData } from '../../../services/apiProgram';

function ArtistForm({ artist, add = false }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const { token } = currentUser;

  const { register, formState, handleSubmit, setValue } = useForm();
  const { errors } = formState;

  const [selectedProgram, setSelectedProgram] = useState(
    artist ? artist.program_id : null
  );
  const [selectedActivity, setSelectedActivity] = useState(
    artist ? artist.activity_id : null
  );
  const [activities, setActivities] = useState([]);

  const [file, setFile] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const formActions = { register, errors };

  const { createArtist } = useCreateArtist();
  const { updateArtist } = useUpdateArtist();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activitiesResult = await getActivityData(selectedProgram, token);
        setActivities(activitiesResult);
      } catch (error) {
        console.error('Error fetching activities:', error.message);
      }
    };

    if (selectedProgram) {
      fetchData();
    }
  }, [selectedProgram, token]);

  const { isLoading: isLoadingProgramData, programData } =
    useProgramData(token);

  if (isLoadingProgramData) return;

  function onSubmit(data) {
    setIsCreating(true);

    let form;
    if (!id) {
      form = {
        ...data,
        program_id: selectedProgram || null,
        activity_id: selectedActivity || null,
        file,
      };

      createArtist({ form, token }, { onSettled: () => setIsCreating(false) });
    } else if (id && file === null) {
      form = {
        ...data,
        program_id: selectedProgram || null,
        activity_id: selectedActivity || null,
      };

      updateArtist(
        { payload: form, id, token },
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
          avatar={true}
        >
          {`Replac${isCreating ? 'ing...' : 'e'}`}
        </CoverImageInput>
      )}
      <FormFields>
        <TextInput
          type="text"
          id="first_name"
          label="First Name"
          placeholder="John"
          defaultValue={artist ? artist.first_name : ''}
          formActions={formActions}
        />
        <TextInput
          type="text"
          id="last_name"
          label="Last Name"
          placeholder="Doe"
          defaultValue={artist ? artist.last_name : ''}
          formActions={formActions}
        />
        <TextInput
          type="text"
          id="medium"
          label="Medium"
          placeholder="Painter"
          defaultValue={artist ? artist.medium : ''}
          formActions={formActions}
        />
        <TextInput
          type="textarea"
          id="bio"
          label="Bio"
          placeholder="Artist bio"
          defaultValue={artist ? artist.bio : ''}
          formActions={formActions}
        />
        <TextInput
          type="text"
          id="video_url"
          label="Video Url"
          placeholder="https://www.youtube.com/artist_video"
          defaultValue={artist ? artist.video_url : ''}
          formActions={formActions}
        />
        <TextInput
          type="text"
          id="instagram_url"
          label="Instagram link"
          placeholder="https://www/instagram.com/artist"
          defaultValue={artist ? artist.instagram_url : ''}
          formActions={formActions}
        />
        <TextInput
          type="email"
          id="email"
          label="Artist E-mail"
          placeholder="artist@example.com"
          defaultValue={artist ? artist.email : ''}
          formActions={formActions}
        />

        <TextInput
          type="select"
          id="program_id"
          label="Program (optional)"
          required={false}
          defaultValue={artist ? artist.program_id : ''}
          formActions={formActions}
          onChange={(e) => setSelectedProgram(e.target.value)}
        >
          <option value="">Select program...</option>
          {programData?.map((program) => (
            <option key={program.id} value={program.id}>
              {program.title}
            </option>
          ))}
        </TextInput>
        {selectedProgram && activities?.length > 0 && (
          <TextInput
            type="select"
            id="activity_id"
            label="Activity"
            defaultValue={artist ? artist.activity_id : ''}
            formActions={formActions}
            onChange={(e) => setSelectedActivity(e.target.value)}
          >
            <option value="">Select activity...</option>
            {activities?.map((activity) => (
              <option key={activity.title} value={activity.id}>
                {activity.title}
              </option>
            ))}
          </TextInput>
        )}
      </FormFields>
      <TwoButtonWrapper>
        <Button variant="primary" type="submit">
          Save
        </Button>
        <Button variant="link-warn" onClick={() => navigate(-1)}>
          Back
        </Button>
      </TwoButtonWrapper>
    </FormWrapper>
  );
}

export default ArtistForm;

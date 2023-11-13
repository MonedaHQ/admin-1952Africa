import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { activitesData, programData } from '../../../data/programsData';

import FormWrapper from '../../ui/FormWrapper';
import FormFields from '../../ui/FormFields';
import TextInput from '../../ui/formChunks/TextInput';
import TwoButtonWrapper from '../../ui/TwoButtonWrapper';
import Button from '../../ui/Button';

function ArtistForm({ artist }) {
  const navigate = useNavigate();
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  const formActions = { register, errors };
  const programs = programData.map((program) => {
    return { title: program.title, id: program.id };
  });
  const activities = activitesData.map((activity) => {
    return { title: activity.title, id: activity.id };
  });

  function onSubmit(data) {
    console.log(data);
  }
  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
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
          placeholder="www.youtube.com/artist_video"
          defaultValue={artist ? artist.video_url : ''}
          formActions={formActions}
        />
        <TextInput
          type="select"
          id="program"
          label="Program"
          defaultValue={
            artist
              ? programs.find((program) => program.id === artist.program)
              : ''
          }
          formActions={formActions}
        >
          {programs.map((program) => (
            <option key={program.title} value={program.title}>
              {program.title}
            </option>
          ))}
        </TextInput>
        <TextInput
          type="select"
          id="activity"
          label="Activity"
          defaultValue={
            artist
              ? activities.find((activity) => activity.id === artist.activity)
              : ''
          }
          formActions={formActions}
        >
          {activities.map((activity) => (
            <option key={activity.title} value={activity.title}>
              {activity.title}
            </option>
          ))}
        </TextInput>
        <TextInput
          type="text"
          id="instagram_link"
          label="Instagram link"
          placeholder="https://www/instagram.com/artist"
          defaultValue={artist ? artist.instagram : ''}
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
      </FormFields>
      <TwoButtonWrapper>
        <Button variant="primary" type="submit">
          Save
        </Button>
        <Button variant="link-dark" onClick={() => navigate(-1)}>
          Back
        </Button>
      </TwoButtonWrapper>
    </FormWrapper>
  );
}

export default ArtistForm;

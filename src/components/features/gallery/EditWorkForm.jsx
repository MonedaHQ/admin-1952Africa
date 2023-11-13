import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { exhibitionData, works } from '../../../data/programsData';

import FormWrapper from '../../ui/FormWrapper';
import FormFields from '../../ui/FormFields';
import TextInput from '../../ui/formChunks/TextInput';
import TwoButtonWrapper from '../../ui/TwoButtonWrapper';
import Button from '../../ui/Button';

function EditWorkForm() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  let work = null;
  let currentExhibition = null;

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
    const { exhibition } = data;
    const { exhibitionId } =
      allExhibitions
        .filter((exhibit) => exhibit.exhibitionTitle === exhibition)
        .at(0) || null;

    const newData = { ...data, exhibition: exhibitionId };
    console.log(newData);
  }
  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormFields onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          type="text"
          id="art_title"
          label="Title"
          placeholder="Art title"
          defaultValue={work ? work.art_title : ''}
          formActions={formActions}
        />
        <TextInput
          type="text"
          id="artist_name"
          label="Artist Name"
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
          id="isAvailable"
          label="Is this piece available?"
          defaultValue={work ? work.isAvailable : ''}
          formActions={formActions}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </TextInput>
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

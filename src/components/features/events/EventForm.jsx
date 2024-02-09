import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import FormFields from '../../ui/FormFields';
import FormWrapper from '../../ui/FormWrapper';
import TextInput from '../../ui/formChunks/TextInput';
import TwoButtonWrapper from '../../ui/TwoButtonWrapper';
import Button from '../../ui/Button';

import CoverImageInput from '../../ui/CoverImageInput';
import { useState } from 'react';
import { useCreateEvent } from './useCreateEvent';
import { reformatDateString } from '../../../utilities/helpers';
import { useUpdateEvent } from './useUpdateEvent';

function EventForm({ event = null, add = false }) {
  const { register, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  const { id } = useParams();

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const { token } = currentUser;

  const formActions = { register, errors };

  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const { createEvent } = useCreateEvent();
  const { updateEvent } = useUpdateEvent();

  let title = '';
  let description = '';
  let startDate = '';
  let endDate = '';
  let sponsored = '';

  if (event) {
    title = event.title;
    description = event.description;
    startDate = reformatDateString(event.start_date);
    endDate = reformatDateString(event.end_date);
    sponsored = event.open_to_sponsorship;
  }

  function onSubmit(data) {
    setIsCreating(true);
    if (!id) {
      const form = { ...data, file };
      createEvent({ form, token }, { onSettled: () => setIsCreating(false) });
    } else if (id && file === null) {
      const newData = {
        ...data,
        start_date: new Date(data.start_date).toISOString(),
        end_date: new Date(data.end_date).toISOString(),
        open_to_sponsorship:
          data.open_to_sponsorship.toLowerCase() === 'true' ? true : false,
      };

      updateEvent(
        { payload: newData, id, token },
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
          placeholder="Event name"
          formActions={formActions}
          defaultValue={title}
        />
        <TextInput
          type="textarea"
          id="description"
          label="Description"
          placeholder="Brief description of the event"
          formActions={formActions}
          defaultValue={description}
        />
        <TextInput
          type="date"
          id="start_date"
          label="Start Date"
          placeholder=""
          formActions={formActions}
          defaultValue={startDate}
        />
        <TextInput
          type="date"
          id="end_date"
          label="End Date"
          placeholder=""
          formActions={formActions}
          defaultValue={endDate}
        />
        <TextInput
          type="select"
          id="open_to_sponsorship"
          label="Is this event open to sponsorships?"
          formActions={formActions}
          defaultValue={sponsored}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </TextInput>
      </FormFields>
      <TwoButtonWrapper>
        <Button variant="primary" type="submit" disabled={isCreating}>
          {`Add${isCreating ? 'ing...' : ''}`}
        </Button>
        <Button variant="link-warn" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </TwoButtonWrapper>
    </FormWrapper>
  );
}

export default EventForm;

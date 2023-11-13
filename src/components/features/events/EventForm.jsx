import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import FormFields from '../../ui/FormFields';
import FormWrapper from '../../ui/FormWrapper';
import TextInput from '../../ui/formChunks/TextInput';
import TwoButtonWrapper from '../../ui/TwoButtonWrapper';
import Button from '../../ui/Button';

function EventForm({ event = null }) {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const formActions = { register, errors };

  const navigate = useNavigate();

  let title = '';
  let description = '';
  let startDate = '';
  let endDate = '';
  let sponsored = '';

  if (event) {
    title = event.title;
    description = event.description;
    startDate = event.start_date;
    endDate = event.end_date;
    sponsored = event.sponsored;
  }

  function onSubmit(data) {
    const newData = {
      ...data,
      sponsored: data.sponsored === 'true' ? true : false,
    };
    console.log(newData);
  }
  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
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
          id="sponsored"
          label="Is this event open to sponsorships?"
          formActions={formActions}
          defaultValue={sponsored}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </TextInput>
      </FormFields>
      <TwoButtonWrapper>
        <Button variant="primary" type="submit">
          Add
        </Button>
        <Button variant="link-dark" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </TwoButtonWrapper>
    </FormWrapper>
  );
}

export default EventForm;

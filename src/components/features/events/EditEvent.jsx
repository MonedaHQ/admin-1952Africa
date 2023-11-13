import { useParams } from 'react-router-dom';

import { eventsData } from '../../../data/programsData';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import AddCoverImg from '../../ui/formChunks/AddCoverImg';
import EventForm from './EventForm';

function EditEvent() {
  const { id } = useParams();
  const event = eventsData.find((event) => event.id === id);
  const imageData = { data: [event], key: 'image_url' };
  return (
    <Section>
      <HeaderAndButton
        header={`Edit event`}
        navigateTo={{
          path: '',
          label: 'Delete event',
          resourceName: event.title,
        }}
        as="delete"
        type="lg"
      />
      <AddCoverImg imageData={imageData} />
      <EventForm event={event} />
    </Section>
  );
}

export default EditEvent;

import { eventsData } from '../../../data/programsData';

import Section from '../../ui/Section';
import BigHeader from '../../ui/headers/BigHeader';
import MainForm from '../../ui/MainForm';
import AddCoverImg from '../../ui/formChunks/AddCoverImg';
import EventForm from './EventForm';

function AddEvents() {
  const imageData = { data: eventsData, key: 'image_url' };
  return (
    <Section>
      <BigHeader title="Add Event" variant="lg" useRole={false} />
      <MainForm>
        <AddCoverImg imageData={imageData} />
        <EventForm />
      </MainForm>
    </Section>
  );
}

export default AddEvents;

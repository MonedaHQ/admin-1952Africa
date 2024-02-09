import Section from '../../ui/Section';
import BigHeader from '../../ui/headers/BigHeader';
import MainForm from '../../ui/MainForm';
import EventForm from './EventForm';

function AddEvents() {
  return (
    <Section>
      <BigHeader title="Add Event" variant="lg" useRole={false} />
      <MainForm>
        <EventForm add={true} />
      </MainForm>
    </Section>
  );
}

export default AddEvents;

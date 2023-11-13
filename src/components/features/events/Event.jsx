import { useParams } from 'react-router-dom';
import { eventsData } from '../../../data/programsData';

import Section from '../../ui/Section';
import BigTitle from '../../ui/BigTitle';
import EventDateIndicator from './EventDateIndicator';

function Event() {
  const { id } = useParams();
  const event = eventsData.find((event) => event.id === id);
  const titleData = {
    title: event.title,
    description: event.description,
    image: event.image_url,
    navigation: `/events/${id}/edit`,
  };
  return (
    <Section>
      <BigTitle titleData={titleData} />
      <EventDateIndicator event={event} />
    </Section>
  );
}

export default Event;

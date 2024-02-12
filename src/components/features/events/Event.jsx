import { useParams } from 'react-router-dom';

import Section from '../../ui/Section';
import BigTitle from '../../ui/BigTitle';
import EventDateIndicator from './EventDateIndicator';
import { useEvent } from './useEvent';
import Loader from '../../ui/Loader';

function Event() {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const { token } = currentUser;

  const { event, isLoading } = useEvent({ id, token });

  if (isLoading) return <Loader fullScreen={true} />;

  const titleData = {
    title: event.title,
    description: event.description,
    image: event.image_url,
    navigation: `/events/${id}/edit`,
  };
  return (
    <Section>
      <BigTitle titleData={titleData} navigateTo={'/events'} />
      <EventDateIndicator event={event} />
    </Section>
  );
}

export default Event;

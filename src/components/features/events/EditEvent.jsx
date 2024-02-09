import { useNavigate, useParams } from 'react-router-dom';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import AddCoverImg from '../../ui/formChunks/AddCoverImg';
import { useEvent } from './useEvent';
import Loader from '../../ui/Loader';
import EventForm from './EventForm';
import { handleImageCompression } from '../../../utilities/helpers';
import { useState } from 'react';
import { useUpdateEventImage } from './useUpdateEventImage';
import { useDeleteEvent } from './useDeleteEvent';

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isUpdating, setIsUpdating] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const { token } = currentUser;

  const { event, isLoading } = useEvent({ id, token });
  const { updateEventImage } = useUpdateEventImage();

  const { deleteEvent } = useDeleteEvent();

  if (isLoading) return <Loader fullScreen={true} />;

  const imageData = { data: [event], key: 'image_url' };

  async function imageReplacement(image) {
    setIsUpdating(true);
    const reducedImage = await handleImageCompression(
      image,
      event.title.trim().toLowerCase()
    );
    updateEventImage(
      { imageFile: reducedImage, id, token },
      { onSettled: () => setIsUpdating(false) }
    );
  }

  function handleDeleteEvent() {
    deleteEvent({ id, token }, { onSuccess: () => navigate('/events') });
  }

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
        onConfirm={handleDeleteEvent}
      />
      <AddCoverImg
        imageData={imageData}
        replacementFunction={imageReplacement}
        isUpdating={isUpdating}
      />
      <EventForm event={event} />
    </Section>
  );
}

export default EditEvent;

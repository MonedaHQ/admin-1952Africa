import { useNavigate, useParams } from 'react-router-dom';

import EditActivity from './EditActivity';

import Section from '../../ui/Section';
import AddCoverImg from '../../ui/formChunks/AddCoverImg';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import { useActivity } from './useActivity';
import { reformatDateString } from '../../../utilities/helpers';
import { useEffect, useState } from 'react';
import { useUpdateActivityImage } from './useUpdateActivityImage';
import { useDeleteActivity } from './useDeleteActivity';

function Activity() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isReloading, setIsReloading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const token = currentUser.token;

  const { isLoadingActivity, activity } = useActivity({ id });
  const { updateActivityImage } = useUpdateActivityImage();

  const { deleteActivity } = useDeleteActivity();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsReloading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [setIsReloading]);

  if (isLoadingActivity) return;

  if (!activity) return;

  const formattedActivity = {
    ...activity,
    date: reformatDateString(activity.date),
  };

  const imageData = { data: [activity], key: 'image_url' };

  async function imageReplacementFunction(image) {
    setIsReloading(true);
    updateActivityImage(
      { imageFile: image, id, token },
      { onSettled: () => setIsReloading(false) }
    );
  }

  function handleDeleteActivity() {
    deleteActivity({ id, token }, { onSuccess: () => navigate(-1) });
  }

  return (
    <Section>
      <HeaderAndButton
        header={`Edit Activity`}
        navigateTo={{
          path: '',
          label: 'Delete activity',
          resourceName: activity.title,
        }}
        as="delete"
        type="lg"
        onConfirm={handleDeleteActivity}
      />

      <AddCoverImg
        imageData={imageData}
        replacementFunction={imageReplacementFunction}
        isUpdating={isReloading}
      />
      {!isReloading && <EditActivity activity={formattedActivity} />}
    </Section>
  );
}

export default Activity;

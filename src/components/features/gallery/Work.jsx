import { useParams } from 'react-router-dom';

import Section from '../../ui/Section';
import AddCoverImg from '../../ui/formChunks/AddCoverImg';
import EditWorkForm from './EditWorkForm';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import { useWork } from './useWork';
import { useEffect, useState } from 'react';
import { useRefreshData } from '../../../hooks/useRefreshData';
import { useUpdateWorkImage } from './useUpdateWorkImage';
import Loader from '../../ui/Loader';
import { handleImageCompression } from '../../../utilities/helpers';

function Work() {
  const { id } = useParams();

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const { token } = currentUser;

  const { work, isLoadingWork } = useWork(id);

  const [isUpdating, setIsUpdating] = useState(false);

  const { updateWorkImage } = useUpdateWorkImage();

  if (isLoadingWork) return <Loader />;

  async function imageReplacement(image) {
    setIsUpdating(true);
    const reducedImage = await handleImageCompression(
      image,
      work.title.trim().toLowerCase()
    );
    updateWorkImage(
      { imageFile: reducedImage, id, token },
      { onSettled: () => setIsUpdating(false) }
    );
  }

  return (
    <Section>
      <HeaderAndButton
        header={work.title}
        navigateTo={{
          path: '',
          label: 'Delete work',
          resourceName: 'this work',
        }}
        as="delete"
        type="lg"
      />
      <AddCoverImg
        imageData={{ data: [work], key: 'image_url' }}
        fullImage={true}
        replacementFunction={imageReplacement}
        isUpdating={isUpdating}
      />
      <EditWorkForm />
    </Section>
  );
}

export default Work;

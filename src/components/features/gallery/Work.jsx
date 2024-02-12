import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import { useWork } from './useWork';
import { useUpdateWorkImage } from './useUpdateWorkImage';
import { useDeleteWork } from './useDeleteWork';
import { handleImageCompression } from '../../../utilities/helpers';

import Section from '../../ui/Section';
import AddCoverImg from '../../ui/formChunks/AddCoverImg';
import EditWorkForm from './EditWorkForm';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import Loader from '../../ui/Loader';

function Work() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const { token } = currentUser;

  const { work, isLoadingWork } = useWork(id);

  const [isUpdating, setIsUpdating] = useState(false);

  const { updateWorkImage } = useUpdateWorkImage();
  const { deleteWork } = useDeleteWork();

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

  function handleDeleteWork() {
    deleteWork({ id, token }, { onSuccess: () => navigate(-1) });
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
        onConfirm={handleDeleteWork}
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

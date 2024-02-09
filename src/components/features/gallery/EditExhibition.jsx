import { useNavigate, useParams } from 'react-router-dom';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import AddCoverImg from '../../ui/formChunks/AddCoverImg';
import ExhibitionForm from './ExhibitionForm';
import { useExhibition } from './useExhibition';
import { handleImageCompression } from '../../../utilities/helpers';
import { useUpdateExhibitionImage } from './useUpdateExhibitionImage';
import { useState } from 'react';
import { useDeleteExhibition } from './useDeleteExhibition';

function EditExhibition() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const { token } = currentUser;

  const { exhibition, isLoading } = useExhibition({ id, token });
  const { updateExhibitionImage } = useUpdateExhibitionImage();
  const { deleteExhibition } = useDeleteExhibition();

  if (isLoading) return;

  const imageData = {
    data: [exhibition],
    key: 'image_url',
  };

  async function imageReplacement(image) {
    setIsUpdating(true);
    const reducedImage = await handleImageCompression(
      image,
      exhibition.title.trim().toLowerCase()
    );
    updateExhibitionImage(
      { imageFile: reducedImage, id, token },
      { onSettled: () => setIsUpdating(false) }
    );
  }

  function handleDeleteExhibition() {
    deleteExhibition({ id, token }, { onSuccess: () => navigate('/gallery') });
  }

  return (
    <Section>
      <HeaderAndButton
        header={`Edit ${exhibition.title}`}
        navigateTo={{
          path: '',
          label: 'Delete exhibition',
          resourceName: 'this exhibition',
        }}
        as="delete"
        type="lg"
        onConfirm={handleDeleteExhibition}
      />
      <AddCoverImg
        imageData={imageData}
        replacementFunction={imageReplacement}
        isUpdating={isUpdating}
      />
      <ExhibitionForm exhibition={exhibition} />
    </Section>
  );
}

export default EditExhibition;

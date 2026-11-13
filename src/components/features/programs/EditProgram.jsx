import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import { useProgram } from './useProgram';
import { useDeleteProgram } from './useDeleteProgram';
import { useUpdateProgramImage } from './useUpdateProgramImage';
import { handleImageCompression } from '../../../utilities/helpers';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import AddCoverImg from '../../ui/formChunks/AddCoverImg';
import MainForm from '../../ui/MainForm';
import ProgramData from './ProgramData';

function EditProgram() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isUpdating, setIsUpdating] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const token = currentUser.token;

  const { program, isLoading: isLoadingProgram } = useProgram({ id, token });
  const { updateProgramImage } = useUpdateProgramImage();

  const { deleteProgram } = useDeleteProgram();

  if (isLoadingProgram) return;

  const imageData = { data: [program], key: 'image_url' };

  async function imageReplacement(image) {
    setIsUpdating(true);
    const reducedImage = await handleImageCompression(
      image,
      program.title.trim().toLowerCase()
    );
    updateProgramImage(
      { imageFile: reducedImage, id, token },
      { onSettled: () => setIsUpdating(false) }
    );
  }

  function handleDeleteProgram() {
    deleteProgram({ id, token }, { onSuccess: () => navigate('/programs') });
  }

  return (
    <Section>
      <HeaderAndButton
        header={`Edit ${program.title}`}
        navigateTo={{
          path: '',
          label: 'Delete Program',
          resourceName: program.title,
        }}
        as="delete"
        type="lg"
        onConfirm={handleDeleteProgram}
      />
      <MainForm layout="split">
        <AddCoverImg
          imageData={imageData}
          replacementFunction={imageReplacement}
          isUpdating={isUpdating}
        />
        <ProgramData add={false} />
      </MainForm>
    </Section>
  );
}

export default EditProgram;

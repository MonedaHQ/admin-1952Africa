import { useParams } from 'react-router-dom';
import { useState } from 'react';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import AddCoverImg from '../../ui/formChunks/AddCoverImg';
import MainForm from '../../ui/MainForm';
import ProgramData from './ProgramData';
import { usePrograms } from './usePrograms';
import { handleImageCompression } from '../../../utilities/helpers';
import { useUpdateProgramImage } from './useUpdateProgramImage';

function EditProgram() {
  const { id } = useParams();

  const [isUpdating, setIsUpdating] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const token = currentUser.token;

  const { programs, isLoading } = usePrograms(token);
  const { updateProgramImage } = useUpdateProgramImage();

  if (isLoading) return;

  const program = programs.find((program) => program.id === id);

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
      />
      <MainForm>
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

import { useParams } from 'react-router-dom';

import { programData } from '../../../data/programsData';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import AddCoverImg from '../../ui/formChunks/AddCoverImg';
import MainForm from '../../ui/MainForm';
import ProgramData from './ProgramData';

function EditProgram() {
  const { slug } = useParams();
  const program = programData.find((program) => program.slug === slug);

  const imageData = { data: [program], key: 'cover_img' };
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
        <AddCoverImg imageData={imageData} />
        <ProgramData />
      </MainForm>
    </Section>
  );
}

export default EditProgram;

import { programData } from '../../../data/programsData';

import MainForm from '../../ui/MainForm';
import Section from '../../ui/Section';
import BigHeader from '../../ui/headers/BigHeader';
import AddCoverImg from '../../ui/formChunks/AddCoverImg';
import ProgramData from './ProgramData';

function AddPrograms() {
  const imageData = { data: programData, key: 'cover_img' };
  return (
    <Section>
      <BigHeader title="Add Program" variant="lg" />
      <MainForm>
        <AddCoverImg imageData={imageData} />
        <ProgramData />
      </MainForm>
    </Section>
  );
}

export default AddPrograms;

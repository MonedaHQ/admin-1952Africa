import MainForm from '../../ui/MainForm';
import Section from '../../ui/Section';
import BigHeader from '../../ui/headers/BigHeader';
import ProgramData from './ProgramData';

function AddPrograms() {
  return (
    <Section>
      <BigHeader title="Add Program" variant="lg" useRole={false} />
      <MainForm>
        <ProgramData />
      </MainForm>
    </Section>
  );
}

export default AddPrograms;

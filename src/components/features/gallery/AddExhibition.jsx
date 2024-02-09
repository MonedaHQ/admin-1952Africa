import Section from '../../ui/Section';
import AddCoverImg from '../../ui/formChunks/AddCoverImg';
import BigHeader from '../../ui/headers/BigHeader';
import ExhibitionForm from './ExhibitionForm';

function AddExhibition() {
  return (
    <Section>
      <BigHeader title="Add Exhibition" variant="lg" useRole={false} />
      <ExhibitionForm add={true} />
    </Section>
  );
}

export default AddExhibition;

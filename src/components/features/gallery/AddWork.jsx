import Section from '../../ui/Section';
import AddCoverImg from '../../ui/formChunks/AddCoverImg';
import BigHeader from '../../ui/headers/BigHeader';
import EditWorkForm from './EditWorkForm';

function AddWork() {
  return (
    <Section>
      <BigHeader title="Add work" variant="lg" />
      <AddCoverImg />
      <EditWorkForm />
    </Section>
  );
}

export default AddWork;

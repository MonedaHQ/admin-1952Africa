import Section from '../../ui/Section';
import BigHeader from '../../ui/headers/BigHeader';
import EditWorkForm from './EditWorkForm';

function AddWork() {
  return (
    <Section>
      <BigHeader title="Add work" variant="lg" />
      <EditWorkForm add={true} fullImage={true} />
    </Section>
  );
}

export default AddWork;

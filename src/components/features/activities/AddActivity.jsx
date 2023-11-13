import EditActivity from './EditActivity';

import Section from '../../ui/Section';
import AddCoverImg from '../../ui/formChunks/AddCoverImg';
import BigHeader from '../../ui/headers/BigHeader';

function AddActivity() {
  return (
    <Section>
      <BigHeader title="Add Activity" variant="lg" />
      <AddCoverImg />
      <EditActivity />
    </Section>
  );
}

export default AddActivity;

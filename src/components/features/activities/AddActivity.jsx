import EditActivity from './EditActivity';

import Section from '../../ui/Section';
import BigHeader from '../../ui/headers/BigHeader';

function AddActivity() {
  return (
    <Section>
      <BigHeader title="Add Activity" variant="lg" useRole={false} />
      <EditActivity add={true} />
    </Section>
  );
}

export default AddActivity;

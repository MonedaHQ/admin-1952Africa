import { useParams } from 'react-router-dom';

import { activitesData } from '../../../data/programsData';

import EditActivity from './EditActivity';

import Section from '../../ui/Section';
import AddCoverImg from '../../ui/formChunks/AddCoverImg';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';

function Activity() {
  const { id } = useParams();

  const activity = activitesData.find((activity) => activity.id === id);

  const imageData = { data: [activity], key: 'image_url' };

  return (
    <Section>
      <HeaderAndButton
        header={`Edit Activity`}
        navigateTo={{
          path: '',
          label: 'Delete activity',
          resourceName: activity.title,
        }}
        as="delete"
        type="lg"
      />

      <AddCoverImg imageData={imageData} />
      <EditActivity activity={activity} />
    </Section>
  );
}

export default Activity;

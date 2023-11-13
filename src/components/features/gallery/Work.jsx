import { useParams } from 'react-router-dom';
import { works } from '../../../data/programsData';

import Section from '../../ui/Section';
import AddCoverImg from '../../ui/formChunks/AddCoverImg';
import EditWorkForm from './EditWorkForm';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';

function Work() {
  const { slug } = useParams();
  const work = works.find((work) => work.slug === slug);

  return (
    <Section>
      <HeaderAndButton
        header={work.art_title}
        navigateTo={{
          path: '',
          label: 'Delete work',
          resourceName: 'this work',
        }}
        as="delete"
        type="lg"
      />
      <AddCoverImg
        imageData={{ data: [work], key: 'image_url' }}
        fullImage={true}
      />
      <EditWorkForm />
    </Section>
  );
}

export default Work;

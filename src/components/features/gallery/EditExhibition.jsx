import { useParams } from 'react-router-dom';

import { exhibitionData } from '../../../data/programsData';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import AddCoverImg from '../../ui/formChunks/AddCoverImg';
import ExhibitionForm from './ExhibitionForm';

function EditExhibition() {
  const { id } = useParams();
  const exhibition = exhibitionData.find((exhibition) => exhibition.id === id);
  const imageData = {
    data: [exhibition],
    key: 'cover_img',
  };
  return (
    <Section>
      <HeaderAndButton
        header={`Edit ${exhibition.title}`}
        navigateTo={{
          path: '',
          label: 'Delete exhibition',
          resourceName: 'this exhibition',
        }}
        as="delete"
        type="lg"
      />
      <AddCoverImg imageData={imageData} />
      <ExhibitionForm exhibition={exhibition} />
    </Section>
  );
}

export default EditExhibition;

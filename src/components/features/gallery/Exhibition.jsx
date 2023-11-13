import { useParams } from 'react-router-dom';
import { exhibitionData } from '../../../data/programsData';

import Section from '../../ui/Section';
import BigTitle from '../../ui/BigTitle';
import Works from './Works';

function Exhibition() {
  const { id } = useParams();
  const event = exhibitionData.find((event) => event.id === id);
  const titleData = {
    title: event.title,
    description: event.description,
    image: event.cover_img,
    navigation: `/gallery/${id}/edit`,
  };
  return (
    <Section>
      <BigTitle titleData={titleData} />
      <Works />
    </Section>
  );
}

export default Exhibition;

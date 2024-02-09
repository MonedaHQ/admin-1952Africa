import { useParams } from 'react-router-dom';

import Section from '../../ui/Section';
import BigTitle from '../../ui/BigTitle';
import Works from './Works';
import { useExhibition } from './useExhibition';

function Exhibition() {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const { token } = currentUser;

  const { exhibition, isLoading } = useExhibition({ id, token });

  if (isLoading) return;

  const titleData = {
    title: exhibition.title,
    description: exhibition.description,
    image: exhibition.image_url,
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

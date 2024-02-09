import { useParams } from 'react-router-dom';

import Section from '../../ui/Section';
import BigTitle from '../../ui/BigTitle';
import Activities from './Activities';

import { useProgram } from './useProgram';

function Program() {
  const { id } = useParams();

  const { program, isLoading } = useProgram({ id });

  if (isLoading) return;

  const titleData = {
    title: program?.title,
    description: program?.description,
    image: program?.image_url,
    navigation: `/programs/${id}/edit`,
  };

  return (
    <Section>
      <BigTitle titleData={titleData} />
      <Activities programId={id} />
    </Section>
  );
}

export default Program;

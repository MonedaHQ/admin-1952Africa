import { useParams } from 'react-router-dom';
import { programData } from '../../../data/programsData';

import Section from '../../ui/Section';
import BigTitle from '../../ui/BigTitle';
import Activities from './Activities';

function Program() {
  const { slug } = useParams();
  const programs = programData;
  const program = programs.find((program) => program.slug === slug);
  const titleData = {
    title: program.title,
    description: program.description,
    image: program.cover_img,
    navigation: `/programs/${slug}/edit`,
  };

  return (
    <Section>
      <BigTitle titleData={titleData} />
      <Activities programId={program.id} />
    </Section>
  );
}

export default Program;

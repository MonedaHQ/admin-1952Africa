import { useParams } from 'react-router-dom';
import { programData } from '../../../data/programsData';

import Section from '../../ui/Section';
import BigTitle from '../../ui/BigTitle';
import Activities from './Activities';
import { usePrograms } from './usePrograms';

function Program() {
  const { id } = useParams();

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const token = currentUser.token;

  const { programs, isLoading } = usePrograms(token);

  if (isLoading) return;

  const program = programs.find((program) => program.id === id);

  const titleData = {
    title: program.title,
    description: program.description,
    image: program.image_url,
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

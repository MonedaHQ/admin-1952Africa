import { useParams } from 'react-router-dom';

import Section from '../../ui/Section';
import BigTitle from '../../ui/BigTitle';
import Activities from './Activities';

import { useProgram } from './useProgram';
import Loader from '../../ui/Loader';

function Program() {
  const { id } = useParams();

  const { program, isLoading } = useProgram({ id });

  if (isLoading) return <Loader />;

  const titleData = {
    title: program?.title,
    description: program?.description,
    image: program?.image_url,
    navigation: `/programs/${id}/edit`,
  };

  return (
    <Section>
      <BigTitle titleData={titleData} navigateTo={'/programs'} />
      <Activities programId={id} />
    </Section>
  );
}

export default Program;

import { useParams } from 'react-router-dom';
import { programData } from '../../../data/programsData';

import ProgramTitle from './ProgramTitle';
import Activities from './Activities';

import styles from './styles/program.module.css';

function Program() {
  const { slug } = useParams();
  const programs = programData;
  const program = programs.find((program) => program.slug === slug);
  return (
    <section className={styles.section}>
      <ProgramTitle program={program} />
      <Activities programId={program.id} />
    </section>
  );
}

export default Program;

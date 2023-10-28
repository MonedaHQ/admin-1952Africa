import { useParams } from 'react-router-dom';
import { programData } from '../../../data/programsData';

function Program() {
  const { id } = useParams();
  const programs = programData;
  const program = programs.find((program) => program.id === id);
  return <div>Program</div>;
}

export default Program;

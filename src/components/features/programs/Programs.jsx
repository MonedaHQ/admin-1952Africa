import { programData } from '../../../data/programsData';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import SearchBar from '../../ui/SearchBar';
import OperationsPanel from '../../ui/OperationsPanel';
import Table from '../../ui/Table';
import { usePrograms } from './usePrograms';

function Programs() {
  const headers = ['Name', 'Description'];
  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));

  const { programs, isLoading } = usePrograms(currentUser.token);

  if (isLoading) return;
  const ids = programs.map((program) => `/programs/${program.id}`);

  const operationData = {
    data: programs,
    keys: ['title', 'description'],
    navigation: ids,
  };

  return (
    <Section>
      <HeaderAndButton
        header="Programs"
        navigateTo={{ label: 'Add program', path: '/programs/add' }}
      />
      <SearchBar placeholder="Search program" />
      <OperationsPanel title={`All programs (${programs.length})`} />
      <Table
        headers={headers}
        operationData={operationData}
        paginationCount={programData.length}
        gridNo={2}
      />
    </Section>
  );
}

export default Programs;

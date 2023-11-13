import { programData } from '../../../data/programsData';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import SearchBar from '../../ui/SearchBar';
import OperationsPanel from '../../ui/OperationsPanel';
import Table from '../../ui/Table';

function Programs() {
  const headers = ['Name', 'Description'];
  const slugs = programData.map((program) => `/programs/${program.slug}`);

  const operationData = {
    data: programData,
    keys: ['title', 'description'],
    navigation: slugs,
  };

  return (
    <Section>
      <HeaderAndButton
        header="Programs"
        navigateTo={{ label: 'Add program', path: '/programs/add' }}
      />
      <SearchBar placeholder="Search program" />
      <OperationsPanel title={`All programs (${programData.length})`} />
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

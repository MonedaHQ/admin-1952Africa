import { usePrograms } from './usePrograms';

import Section from '../../ui/Section';
import Loader from '../../ui/Loader';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import SearchBar from '../../ui/SearchBar';
import OperationsPanel from '../../ui/OperationsPanel';
import Table from '../../ui/Table';
import EmptyData from '../../ui/EmptyData';

function Programs() {
  const headers = ['Name', 'Description'];

  const { programs, isLoading } = usePrograms();

  if (isLoading) return <Loader fullScreen={true} />;

  const ids = programs.data.map((program) => `/programs/${program.id}`) || [];

  const operationData = {
    data: programs.data,
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
      <OperationsPanel
        title={`All programs (${programs.meta.totalItems || ''})`}
      />
      {!isLoading && programs.data.length > 0 && (
        <Table
          headers={headers}
          operationData={operationData}
          paginationCount={programs.meta.totalItems}
          gridNo={2}
        />
      )}
      {programs.data.length < 1 && <EmptyData />}
    </Section>
  );
}

export default Programs;

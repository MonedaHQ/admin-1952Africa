import { programData } from '../../../data/programsData';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import SearchBar from '../../ui/SearchBar';
import OperationsPanel from '../../ui/OperationsPanel';
import Table from '../../ui/Table';
import { usePrograms } from './usePrograms';
import EmptyData from '../../ui/EmptyData';
import Loader from '../../ui/Loader';

function Programs() {
  const headers = ['Name', 'Description'];
  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));

  const { programs, isLoading } = usePrograms(currentUser.token);

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
      <OperationsPanel title={`All programs (${programs.data.length || ''})`} />
      {!isLoading && programs.data.length > 0 && (
        <Table
          headers={headers}
          operationData={operationData}
          paginationCount={programs.meta.itemCount}
          gridNo={2}
        />
      )}
      {programs.data.length < 1 && <EmptyData />}
    </Section>
  );
}

export default Programs;

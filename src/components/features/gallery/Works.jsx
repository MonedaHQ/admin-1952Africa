import { useParams } from 'react-router-dom';
import { works } from '../../../data/programsData';

import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import MainForm from '../../ui/MainForm';
import SearchBar from '../../ui/SearchBar';
import OperationsPanel from '../../ui/OperationsPanel';
import Table from '../../ui/Table';

function Works() {
  const { id } = useParams();

  const tableHeaders = ['Title', 'Medium', 'Artist', 'Availability'];
  const selectedWorks = works.filter((work) => work.exhibition === id);

  const newWorksData = selectedWorks.map((work) => {
    return {
      ...work,
      isAvailable: work.isAvailable ? 'Available' : 'Sold',
    };
  });

  const tableData = {
    data: newWorksData.slice(0, 9),
    keys: ['art_title', 'medium', 'artist_name', 'isAvailable'],
    navigation: newWorksData.slice(0.9).map((work) => `/works/${work.slug}`),
  };

  return (
    <MainForm>
      <HeaderAndButton
        header="Works"
        navigateTo={{ path: '/works/add', label: 'Add work' }}
        type="lg"
      />
      <SearchBar placeholder="Search work" />
      <OperationsPanel title={`All works (${newWorksData.length})`} />
      <Table
        headers={tableHeaders}
        operationData={tableData}
        paginationCount={newWorksData.length}
      />
    </MainForm>
  );
}

export default Works;

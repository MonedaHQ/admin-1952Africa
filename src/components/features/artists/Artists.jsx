import { artists } from '../../../data/programsData';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import SearchBar from '../../ui/SearchBar';
import OperationsPanel from '../../ui/OperationsPanel';
import Table from '../../ui/Table';

function Artists() {
  const tableHeaders = ['Name', 'Medium', 'Program', 'Activity'];

  const newArtists = artists.map((artist) => {
    return { ...artist, full_name: `${artist.first_name} ${artist.last_name}` };
  });

  const slugs = artists.map((artist) => {
    return `/artists/${artist.slug}`;
  });

  const dataKeys = ['full_name', 'medium', 'program', 'activity'];

  const operationData = { data: newArtists, keys: dataKeys, navigation: slugs };
  return (
    <Section>
      <HeaderAndButton
        header="Artists"
        navigateTo={{ label: 'Add artist', path: '/artists/add' }}
      />
      <SearchBar placeholder="Search Artist" />
      <OperationsPanel title={`All artists (${newArtists.length})`} />
      <Table
        headers={tableHeaders}
        operationData={operationData}
        paginationCount={newArtists.length}
      />
    </Section>
  );
}

export default Artists;

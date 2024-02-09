import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import SearchBar from '../../ui/SearchBar';
import OperationsPanel from '../../ui/OperationsPanel';
import Table from '../../ui/Table';
import { useArtists } from './useArtists';
import EmptyData from '../../ui/EmptyData';

function Artists() {
  const tableHeaders = ['First name', 'Last name', 'Medium', 'Email'];

  const { artists, isLoading } = useArtists();

  if (isLoading) return;

  const newArtists = artists.data.map((artist) => {
    return { ...artist, full_name: `${artist.first_name} ${artist.last_name}` };
  });

  const ids = artists.data.map((artist) => {
    return `/artists/${artist.id}`;
  });

  const dataKeys = ['first_name', 'last_name', 'medium', 'email'];

  const operationData = { data: artists.data, keys: dataKeys, navigation: ids };
  return (
    <Section>
      <HeaderAndButton
        header="Artists"
        navigateTo={{ label: 'Add artist', path: '/artists/add' }}
      />
      <SearchBar placeholder="Search Artist" />
      <OperationsPanel title={`All artists (${newArtists.length})`} />
      {!isLoading && artists.data.length > 0 && (
        <Table
          headers={tableHeaders}
          operationData={operationData}
          paginationCount={artists.meta.itemCount}
          gridNo={4}
        />
      )}
      {artists.data.length < 1 && <EmptyData />}
    </Section>
  );
}

export default Artists;

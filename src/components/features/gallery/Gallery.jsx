import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import OperationsPanel from '../../ui/OperationsPanel';
import SearchBar from '../../ui/SearchBar';
import Table from '../../ui/Table';
import { useExhibitions } from './useExhibitions';
import EmptyData from '../../ui/EmptyData';
import Loader from '../../ui/Loader';

function Gallery() {
  const tableHeaders = ['Name', 'Description', 'Year'];
  const dataKeys = ['title', 'description', 'year'];

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const { token } = currentUser;

  const { exhibitions, isLoading } = useExhibitions(token);

  if (isLoading) return <Loader />;

  const navigationIDs = exhibitions.data.map(
    (exhibition) => `/gallery/${exhibition.id}`
  );

  const operations = {
    data: exhibitions.data,
    keys: dataKeys,
    navigation: navigationIDs,
  };

  return (
    <Section>
      <HeaderAndButton
        header="Gallery"
        navigateTo={{ label: 'Add exhibition', path: '/gallery/add' }}
      />
      <SearchBar placeholder="Search gallery" />
      <OperationsPanel title="All exhibitions" />
      {exhibitions.data.length > 0 && (
        <Table
          headers={tableHeaders}
          operationData={operations}
          paginationCount={exhibitions.meta.itemCount}
          gridNo={3}
        />
      )}
      {!exhibitions.data.length && <EmptyData />}
    </Section>
  );
}

export default Gallery;

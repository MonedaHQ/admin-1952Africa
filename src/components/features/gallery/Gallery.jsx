import { exhibitionData } from '../../../data/programsData';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import OperationsPanel from '../../ui/OperationsPanel';
import SearchBar from '../../ui/SearchBar';
import Table from '../../ui/Table';

function Gallery() {
  const tableHeaders = ['Name', 'Description', 'Artists', 'Year'];
  const dataKeys = ['title', 'description', 'artists', 'year'];

  const newExhibitionData = exhibitionData.map((exhibition) => {
    return {
      ...exhibition,
      sponsored: exhibition.sponsored ? 'Sponsored' : 'Not Sponsored',
      artists: exhibition.artists.length,
    };
  });

  const navigationIDs = exhibitionData.map((event) => `/gallery/${event.id}`);

  const operations = {
    data: newExhibitionData,
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
      <Table
        headers={tableHeaders}
        operationData={operations}
        paginationCount={newExhibitionData.length}
      />
    </Section>
  );
}

export default Gallery;

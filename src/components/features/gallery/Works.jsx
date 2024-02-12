import { useParams } from 'react-router-dom';

import { useWorks } from './useWorks';
import { useArtistData } from '../artists/useArtistData';

import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import MainForm from '../../ui/MainForm';
import SearchBar from '../../ui/SearchBar';
import OperationsPanel from '../../ui/OperationsPanel';
import Table from '../../ui/Table';
import EmptyData from '../../ui/EmptyData';

function Works() {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const { token } = currentUser;

  const { works, isLoadingWorks } = useWorks(id);
  const { artistData, isLoading: isLoadingArtistData } = useArtistData(token);

  const tableHeaders = ['Title', 'Medium', 'Artist', 'Availability'];

  if (isLoadingWorks && isLoadingArtistData) return;

  const newWorksData = works?.data.map((work) => {
    const artist = artistData?.find((artist) => artist.id === work.artist_id);
    return {
      ...work,
      isAvailable: work?.is_available ? 'Available' : 'Sold',
      artist_name: `${artist?.first_name} ${artist?.last_name}`,
    };
  });

  const tableData = {
    data: newWorksData || [],
    keys: ['title', 'medium', 'artist_name', 'isAvailable'],
    navigation: newWorksData?.map((work) => `/works/${work.id}`),
  };

  return (
    <MainForm>
      <HeaderAndButton
        header="Works"
        navigateTo={{ path: '/works/add', label: 'Add work' }}
        type="lg"
      />
      <SearchBar placeholder="Search work" />
      <OperationsPanel title={`All works (${works?.meta.totalItems || 0})`} />
      {!isLoadingWorks && works?.data.length > 0 && (
        <Table
          headers={tableHeaders}
          operationData={tableData}
          paginationCount={works?.meta.totalItems}
        />
      )}
      {(works?.data.length < 1 || !works) && <EmptyData />}
    </MainForm>
  );
}

export default Works;

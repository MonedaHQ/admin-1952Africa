import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useArtist } from './useArtist';
import { useDeleteArtist } from './useDeleteArtist';
import { useUpdateArtistAvatar } from './useUpdateArtistImage';
import { useRefreshData } from '../../../hooks/useRefreshData';

import Loader from '../../ui/Loader';
import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import Avatar from '../../ui/Avatar';
import ArtistForm from './ArtistForm';

function Artist() {
  const { id } = useParams();

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const { token } = currentUser;

  const navigate = useNavigate();

  const [isReloading, setIsReloading] = useState(true);

  const { artist, isLoading } = useArtist(id);

  const { updateArtistAvatar } = useUpdateArtistAvatar();
  const { deleteArtist } = useDeleteArtist();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsReloading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [setIsReloading]);

  const isReloadingData = useRefreshData();

  if (isLoading || isReloadingData) return <Loader />;

  const imageData = { data: artist, key: 'image_url' };

  async function imageReplacementFunction(image) {
    setIsReloading(true);
    updateArtistAvatar(
      { imageFile: image, id, token },
      { onSettled: () => setIsReloading(false) }
    );
  }

  function handleDeleteArtist() {
    deleteArtist({ id, token }, { onSettled: () => navigate('/artists') });
  }

  return (
    <Section>
      <HeaderAndButton
        header={`Edit ${artist.first_name}'s profile`}
        navigateTo={{
          path: '',
          label: 'Delete artist',
          resourceName: 'this artist',
        }}
        as="delete"
        type="lg"
        onConfirm={handleDeleteArtist}
      />
      <Avatar
        imageData={imageData}
        isUpdating={isReloading}
        replacementFunction={imageReplacementFunction}
      />
      {!isReloading && <ArtistForm artist={artist} />}
    </Section>
  );
}

export default Artist;

import { useParams } from 'react-router-dom';
import { artists } from '../../../data/programsData';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import Avatar from '../../ui/Avatar';
import ArtistForm from './ArtistForm';

function Artist() {
  const { slug } = useParams();
  const currentArtist = artists.find((artist) => artist.slug === slug);

  const imageData = { data: currentArtist, key: 'profile_img' };
  return (
    <Section>
      <HeaderAndButton
        header={`Edit ${currentArtist.first_name}'s profile`}
        navigateTo={{
          path: '',
          label: 'Delete artist',
          resourceName: 'this artist',
        }}
        as="delete"
        type="lg"
      />
      <Avatar imageData={imageData} />
      <ArtistForm artist={currentArtist} />
    </Section>
  );
}

export default Artist;

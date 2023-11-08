import { useParams } from 'react-router-dom';
import { artists } from '../../../data/programsData';

import styles from './styles/artist.module.css';
import ArtistForm from './ArtistForm';
import Avatar from '../../ui/Avatar';

function Artist() {
  const { slug } = useParams();
  const currentArtist = artists.find((artist) => artist.slug === slug);
  return (
    <section className={styles.section}>
      <h1>
        {currentArtist.first_name} {currentArtist.last_name}
      </h1>
      <div>
        <Avatar artist={currentArtist} />
        <ArtistForm artist={currentArtist} />
      </div>
    </section>
  );
}

export default Artist;

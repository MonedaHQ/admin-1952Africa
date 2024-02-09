import BigHeader from '../../ui/headers/BigHeader';
import ArtistForm from './ArtistForm';
import Section from '../../ui/Section';
import MainForm from '../../ui/MainForm';

function AddArtist() {
  return (
    <Section>
      <BigHeader title="Add artist" variant="lg" useRole={false} />
      <MainForm>
        <ArtistForm add={true} />
      </MainForm>
    </Section>
  );
}

export default AddArtist;

import BigHeader from '../../ui/headers/BigHeader';
import Avatar from '../../ui/Avatar';
import ArtistForm from './ArtistForm';
import Section from '../../ui/Section';
import MainForm from '../../ui/MainForm';

function AddArtist() {
  return (
    <Section>
      <BigHeader title="Add artist" variant="lg" useRole={false} />
      <MainForm>
        <Avatar />
        <ArtistForm />
      </MainForm>
    </Section>
  );
}

export default AddArtist;

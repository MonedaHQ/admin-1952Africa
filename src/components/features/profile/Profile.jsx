import { usersData } from '../../../data/programsData';

import Section from '../../ui/Section';
import BigHeader from '../../ui/headers/BigHeader';
import MainForm from '../../ui/MainForm';
import Avatar from '../../ui/Avatar';
import PersonalInfo from './forms/PersonalInfo';
import ChangePassword from './forms/ChangePassword';
import SignOut from './SignOut';

function Profile() {
  const currentUser = usersData.find((user) => user.authenticated);
  const imageData = { data: currentUser, key: 'profile_img' };
  return (
    <Section>
      <BigHeader title="Account Preferences" variant="md" />
      <MainForm>
        <Avatar imageData={imageData} />
        <PersonalInfo user={currentUser} />
        <ChangePassword />
        <SignOut />
      </MainForm>
    </Section>
  );
}

export default Profile;

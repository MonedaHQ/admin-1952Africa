import Section from '../../ui/Section';
import BigHeader from '../../ui/headers/BigHeader';
import MainForm from '../../ui/MainForm';
import Avatar from '../../ui/Avatar';
import PersonalInfo from './forms/PersonalInfo';
import ChangePassword from './forms/ChangePassword';
import SignOut from './SignOut';
import { handleImageCompression } from '../../../utilities/helpers';
import { useProfileImg } from './useProfileImg';
import { getCurrentUser } from '../../../services/apiUser';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/profile.module.css';

function Profile() {
  const user = JSON.parse(localStorage.getItem('1952adminUser'));
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const imageData = { data: user, key: 'image_url' };
  const userRole = user.role;

  const { updateProfileImg } = useProfileImg();

  async function handleImageReplacement(image) {
    setIsUpdating(true);
    const filename = `${user.first_name}-${user.last_name}-profile-img`;
    const compressedImage = await handleImageCompression(image, filename);
    updateProfileImg(
      { image: compressedImage, token: user.token },
      {
        onSettled: async () => {
          const currentUser = await getCurrentUser(user.id, user.token);

          localStorage.setItem(
            '1952adminUser',
            JSON.stringify({ ...user, ...currentUser })
          );

          setIsUpdating(false);
          navigate('/home');
        },
      }
    );
  }
  return (
    <Section>
      <div className={styles.heading}>
        <span>Profile & security</span>
        <BigHeader
          title="Account preferences"
          variant="md"
          userRole={userRole}
          useRole={true}
        />
        <p>Manage your personal details, profile image, and account security.</p>
      </div>
      <MainForm>
        <Avatar
          imageData={imageData}
          replacementFunction={handleImageReplacement}
          isUpdating={isUpdating}
        />
        <PersonalInfo user={user} />
        <ChangePassword />
        <SignOut />
      </MainForm>
    </Section>
  );
}

export default Profile;

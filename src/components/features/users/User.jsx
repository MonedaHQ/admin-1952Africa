import { useParams } from 'react-router-dom';
import { usersData } from '../../../data/programsData';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import BigHeader from '../../ui/headers/BigHeader';
import Avatar from '../../ui/Avatar';
import EditUser from './EditUser';
import LastLogin from './LastLogin';

function User() {
  const { id } = useParams();
  const selectedUser = usersData.find((user) => user.user_id === id);
  const isAdmin = selectedUser.role === 'admin';

  const imageData = { data: selectedUser, key: 'profile_img' };
  return (
    <Section>
      {!isAdmin ? (
        <HeaderAndButton
          header={`${selectedUser.first_name} ${selectedUser.last_name}`}
          navigateTo={{
            path: '',
            label: 'Delete user',
            resourceName: 'this user',
          }}
          as="delete"
        />
      ) : (
        <BigHeader
          title={`${selectedUser.first_name} ${selectedUser.last_name}`}
          variant="lg"
        />
      )}
      <Avatar imageData={imageData} editable={false} />
      <LastLogin user={selectedUser} />
      <EditUser user={selectedUser} />
    </Section>
  );
}

export default User;

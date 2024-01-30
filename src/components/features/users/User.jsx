import { useUser } from './useUser';
import { useParams } from 'react-router-dom';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import BigHeader from '../../ui/headers/BigHeader';
import Avatar from '../../ui/Avatar';
import EditUser from './EditUser';
import { useEffect, useState } from 'react';
import Loader from '../../ui/Loader';
import LastLogin from './LastLogin';

function User() {
  const [isReloading, setIsReloading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));

  const token = currentUser.token;

  const { id } = useParams();
  const { user } = useUser(id, token);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsReloading(false);
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [setIsReloading]);

  if (isReloading) return <Loader fullScreen={true} />;

  const userRole = user.role.toLowerCase();

  const isAdmin = userRole === 'admin';
  const isSuperAdmin = userRole === 'superadmin';
  const isCurrentUserSuperAdmin =
    currentUser.role.toLowerCase() === 'superadmin';

  const imageData = { data: user, key: 'image_url' };
  return (
    <Section>
      {!isReloading &&
      (isCurrentUserSuperAdmin || !isAdmin) &&
      !isSuperAdmin ? (
        <HeaderAndButton
          header={`${user.first_name} ${user.last_name}`}
          navigateTo={{
            path: '',
            label: 'Delete user',
            resourceName: 'this user',
          }}
          as="delete"
        />
      ) : (
        <BigHeader
          title={!isReloading && `${user.first_name} ${user.last_name}`}
          variant="lg"
        />
      )}
      {!isReloading && (
        <>
          <Avatar imageData={imageData} editable={false} />
          <LastLogin user={user} />

          <EditUser user={user} isSuperAdmin={isCurrentUserSuperAdmin} />
        </>
      )}
    </Section>
  );
}

export default User;

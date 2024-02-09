import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import OperationsPanel from '../../ui/OperationsPanel';
import SearchBar from '../../ui/SearchBar';
import Table from '../../ui/Table';
import { useUsers } from './useUsers';
import {
  capitalizeFirstLetter,
  formatDateToRelative,
  reformatDateString,
} from '../../../utilities/helpers';
import EmptyData from '../../ui/EmptyData';
import Loader from '../../ui/Loader';

function Users() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('1952adminUser'));

  const userRole = user.role.toLowerCase();

  useEffect(() => {
    if (userRole === 'user' || userRole === 'editor') return navigate('/home');
  }, [userRole, navigate]);

  const { users, isLoading } = useUsers(user.token);

  if (isLoading) return <Loader fullScreen={true} />;

  const headers = ['First Name', 'Last Name', 'Role', 'Last log in'];

  const navigationIds = users.data.map((currentUser) =>
    currentUser.id === user?.id ? '/profile' : `/users/${currentUser?.id}`
  );

  const modifiedUsers = users.data.map((user) => {
    return {
      ...user,
      updated_at: capitalizeFirstLetter(
        formatDateToRelative(reformatDateString(user.updated_at))
      ),
    };
  });

  const operationData = {
    data: modifiedUsers,
    keys: ['first_name', 'last_name', 'role', 'updated_at'],
    navigation: navigationIds,
  };

  return (
    <Section>
      <HeaderAndButton
        header="Users"
        navigateTo={{ path: '/users/add', label: 'Add user' }}
      />
      <SearchBar placeholder={'Search users'} param="name" />
      {!isLoading && (
        <>
          <OperationsPanel title={`All users (${users.meta.itemCount})`} />
          {users.data.length ? (
            <Table
              headers={headers}
              operationData={operationData}
              paginationCount={users.meta.itemCount}
            />
          ) : (
            <EmptyData />
          )}
        </>
      )}
    </Section>
  );
}

export default Users;

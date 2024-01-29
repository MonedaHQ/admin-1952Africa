import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import OperationsPanel from '../../ui/OperationsPanel';
import SearchBar from '../../ui/SearchBar';
import Table from '../../ui/Table';
import { useUsers } from './useUsers';

function Users() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('1952adminUser'));

  const userRole = user.user_type.toLowerCase();
  useEffect(() => {
    if (userRole !== 'admin') return navigate('/home');
  }, [userRole, navigate]);

  const { users, isLoading } = useUsers(user.token);
  if (isLoading) return;

  const headers = ['First Name', 'Last Name', 'Role'];
  const navigationIds = users.map((currentUser) =>
    currentUser.id === user?.id ? '/profile' : `/users/${currentUser?.id}`
  );

  const operationData = {
    data: users,
    keys: ['first_name', 'last_name', 'role'],
    navigation: navigationIds,
  };

  return (
    <Section>
      <HeaderAndButton
        header="Users"
        navigateTo={{ path: '/users/add', label: 'Add user' }}
      />
      <SearchBar placeholder={'Search users'} />
      <OperationsPanel title="All users" />
      <Table
        headers={headers}
        operationData={operationData}
        paginationCount={users.length}
        gridNo={3}
      />
    </Section>
  );
}

export default Users;

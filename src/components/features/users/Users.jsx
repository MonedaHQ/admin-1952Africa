import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { usersData } from '../../../data/programsData';

import {
  capitalizeFirstLetter,
  formatDateToRelative,
} from '../../../utilities/helpers';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import OperationsPanel from '../../ui/OperationsPanel';
import SearchBar from '../../ui/SearchBar';
import Table from '../../ui/Table';

function Users() {
  const navigate = useNavigate();
  const currentUser = usersData.find(
    (user) => user.role === 'admin' && user.authenticated
  );

  useEffect(() => {
    if (!currentUser) return navigate('/home');
  }, [currentUser, navigate]);

  const newUsersData = usersData.map((user) => {
    return {
      ...user,
      role: capitalizeFirstLetter(user.role),
      last_log_in: capitalizeFirstLetter(
        formatDateToRelative(user.last_log_in)
      ),
    };
  });

  const headers = ['First Name', 'Last Name', 'Role', 'Last Log In'];
  const navigationIds = newUsersData.map((user) =>
    user.user_id === currentUser?.user_id
      ? '/profile'
      : `/users/${user?.user_id}`
  );

  const operationData = {
    data: newUsersData,
    keys: ['first_name', 'last_name', 'role', 'last_log_in'],
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
        paginationCount={usersData.length}
      />
    </Section>
  );
}

export default Users;

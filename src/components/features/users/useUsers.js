import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../../services/apiUser';
import { useSearchParams } from 'react-router-dom';

export function useUsers(token) {
  const [searchParams] = useSearchParams();

  //search
  const searchValues = searchParams.get('name');
  const searchQuery =
    !searchValues || searchValues === ''
      ? null
      : { field: 's', value: searchValues };

  //filterByRange
  const range = searchParams.get('range');
  const rangeStatus = !range
    ? null
    : { field: 'name', value: range.toLowerCase() };

  //sort
  const sortBy = searchParams.get('sortBy');
  const sortMethod = !sortBy
    ? null
    : {
        field: sortBy === 'name' ? 'sort' : 'sortOrder',
        value:
          sortBy === 'name'
            ? 'first_name'
            : sortBy === 'earliest'
            ? 'ASC'
            : 'DESC',
      };

  //pagination
  const page = !searchParams.get('page') ? 1 : +searchParams.get('page');

  const { isLoading, data: users } = useQuery({
    queryKey: ['users', rangeStatus, searchQuery, sortMethod, page],
    queryFn: () =>
      getUsers({ token, rangeStatus, searchQuery, sortMethod, page }),
  });

  return { isLoading, users };
}

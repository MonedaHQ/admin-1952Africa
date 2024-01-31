import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getActivities as getActivitiesApi } from '../../../services/apiProgram';

export function useActivities({ program_id, token }) {
  const [searchParams] = useSearchParams();

  //search;
  const searchValues = searchParams.get('name');
  const searchQuery =
    !searchValues || searchValues === ''
      ? null
      : { field: 's', value: searchValues };

  //filterByRange;
  const range = searchParams.get('range');
  const rangeStatus = !range
    ? null
    : { field: 'title', value: range.toLowerCase() };

  //sort;
  const sortBy = searchParams.get('sortBy');
  const sortMethod = !sortBy
    ? null
    : {
        field: sortBy === 'name' ? 'sort' : 'sortOrder',
        value:
          sortBy === 'name' ? 'title' : sortBy === 'earliest' ? 'ASC' : 'DESC',
      };

  const { isLoading, data: activities } = useQuery({
    queryKey: ['activities', searchQuery, rangeStatus, sortMethod],
    queryFn: () =>
      getActivitiesApi({
        token,
        program_id,
        searchQuery,
        rangeStatus,
        sortMethod,
      }),
  });

  return { isLoading, activities };
}

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getEvents } from '../../../services/apiEvents';

export function useEvents(token) {
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
    : { field: 'title', value: range.toLowerCase() };

  //sort
  const sortBy = searchParams.get('sortBy');
  const sortMethod = !sortBy
    ? null
    : {
        field: sortBy === 'name' ? 'sort' : 'sortOrder',
        value:
          sortBy === 'name' ? 'title' : sortBy === 'earliest' ? 'ASC' : 'DESC',
      };

  const { isLoading, data: events } = useQuery({
    queryKey: ['events', rangeStatus, searchQuery, sortMethod],
    queryFn: () => getEvents({ token, rangeStatus, searchQuery, sortMethod }),
  });

  return { isLoading, events };
}

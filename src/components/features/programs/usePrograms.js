import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getPrograms } from '../../../services/apiProgram';

export function usePrograms() {
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

  //pagination
  const page = !searchParams.get('page') ? 1 : +searchParams.get('page');

  const { isLoading, data: programs } = useQuery({
    queryKey: ['programs', rangeStatus, searchQuery, sortMethod, page],
    queryFn: () => getPrograms({ rangeStatus, searchQuery, sortMethod, page }),
  });

  return { isLoading, programs };
}

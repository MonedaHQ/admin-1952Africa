import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getExhibitions } from '../../../services/apiGallery';

export function useExhibitions(token) {
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

  const { isLoading, data: exhibitions } = useQuery({
    queryKey: ['exhibitions', rangeStatus, searchQuery, sortMethod, page],
    queryFn: () =>
      getExhibitions({ token, rangeStatus, searchQuery, sortMethod, page }),
  });

  return { isLoading, exhibitions };
}

import { useQuery } from '@tanstack/react-query';
import { getActivity } from '../../../services/apiProgram';

export function useActivity({ id }) {
  const { isLoading, data: activity } = useQuery({
    queryKey: ['activity'],
    queryFn: () => getActivity(id),
  });

  return { isLoading, activity };
}

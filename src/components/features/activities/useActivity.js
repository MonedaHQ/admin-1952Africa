import { useQuery } from '@tanstack/react-query';
import { getActivity } from '../../../services/apiProgram';

export function useActivity({ id }) {
  const { isLoading, data: activity } = useQuery({
    queryKey: ['activity', id],
    queryFn: () => getActivity(id),
    enabled: Boolean(id),
  });

  return { isLoading, activity };
}

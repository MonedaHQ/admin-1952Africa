import { useQuery } from '@tanstack/react-query';
import { getActivity } from '../../../services/apiProgram';

export function useActivity({ id, token }) {
  const { isLoading, data: activity } = useQuery({
    queryKey: ['activity'],
    queryFn: () => getActivity(id, token),
  });

  return { isLoading, activity };
}

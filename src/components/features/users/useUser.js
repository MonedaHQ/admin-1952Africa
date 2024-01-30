import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../../services/apiUser';

export function useUser(id, token) {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(id, token),
  });

  return { isLoading, user };
}

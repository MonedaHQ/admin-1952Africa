import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../../services/apiUser';

export function useUser(id, token) {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id, token),
    enabled: Boolean(id && token),
  });

  return { isLoading, user };
}

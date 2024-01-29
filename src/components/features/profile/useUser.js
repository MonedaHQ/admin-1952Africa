import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../../services/apiUser';

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: (id) => getCurrentUser(id),
  });

  return { isLoading, user };
}

import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../../services/apiUser';

export function useUsers(token) {
  const { isLoading, data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(token),
  });

  return { isLoading, users };
}

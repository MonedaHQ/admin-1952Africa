import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../../services/apiUser';

export function useUser() {
  const storedUser = JSON.parse(localStorage.getItem('1952adminUser') || 'null');
  const { isLoading, data: user } = useQuery({
    queryKey: ['current-user', storedUser?.id],
    queryFn: () => getCurrentUser(storedUser.id, storedUser.token),
    enabled: Boolean(storedUser?.id && storedUser?.token),
  });

  return { isLoading, user };
}

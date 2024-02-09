import { useQuery } from '@tanstack/react-query';
import { getEvent } from '../../../services/apiEvents';

export function useEvent({ id, token }) {
  const { isLoading, data: event } = useQuery({
    queryKey: ['event'],
    queryFn: () => getEvent(id, token),
  });

  return { isLoading, event };
}

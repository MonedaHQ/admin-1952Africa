import { useQuery } from '@tanstack/react-query';
import { getEvent } from '../../../services/apiEvents';

export function useEvent({ id, token }) {
  const { isLoading, data: event } = useQuery({
    queryKey: ['event', id],
    queryFn: () => getEvent(id, token),
    enabled: Boolean(id && token),
  });

  return { isLoading, event };
}

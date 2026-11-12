import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getWork } from '../../../services/apiWorks';

export function useWork(id) {
  const queryClient = useQueryClient();

  const { isLoading: isLoadingWork, data: work } = useQuery({
    queryKey: ['work', id],
    queryFn: () => getWork(id),
    enabled: Boolean(id),
  });

  function refetchWork() {
    queryClient.invalidateQueries({ queryKey: ['work', id] });
  }

  return { isLoadingWork, work, refetchWork };
}

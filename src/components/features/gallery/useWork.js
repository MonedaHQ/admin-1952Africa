import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getWork } from '../../../services/apiWorks';

export function useWork(id) {
  const queryClient = useQueryClient();

  const { isLoading: isLoadingWork, data: work } = useQuery({
    queryKey: ['work'],
    queryFn: () => getWork(id),
  });

  function refetchWork() {
    queryClient.invalidateQueries('work');
  }

  return { isLoadingWork, work, refetchWork };
}

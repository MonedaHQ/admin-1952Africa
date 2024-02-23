import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getAnalytics } from '../../../services/apiAnalytics';

export function useAnalytics() {
  const [searchParams] = useSearchParams();

  //search
  const metrics = searchParams.get('metrics');
  const dateRange = metrics?.toLowerCase().split(' ').join('_') || 'all_time';

  const { isLoading, data: analytics } = useQuery({
    queryKey: ['analytics', dateRange],
    queryFn: () => getAnalytics({ dateRange }),
  });

  return { isLoading, analytics };
}

import { useQuery } from '@tanstack/react-query';
import { getActivityData } from '../../../services/apiProgram';

export function useActivityData({ token }) {
  const { isLoading: isLoadingActivities, data: activityData } = useQuery({
    queryKey: ['activity-data'],
    queryFn: () => getActivityData(token),
    enabled: Boolean(token),
  });

  return { isLoadingActivities, activityData };
}

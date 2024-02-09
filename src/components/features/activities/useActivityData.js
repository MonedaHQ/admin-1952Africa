import { useQuery } from '@tanstack/react-query';
import { getActivityData } from '../../../services/apiProgram';

export function useActivityData({ token }) {
  const { isLoadingActivities, data: activityData } = useQuery({
    queryKey: ['activity-data'],
    queryFn: () => getActivityData(token),
  });

  return { isLoadingActivities, activityData };
}

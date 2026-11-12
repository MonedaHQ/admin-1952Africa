import { useQuery } from '@tanstack/react-query';
import { getExhibitionData } from '../../../services/apiGallery';

export function useExhibitionData(token) {
  const { isLoading, data: exhibitionData } = useQuery({
    queryKey: ['exhibition-data'],
    queryFn: () => getExhibitionData(token),
    enabled: Boolean(token),
  });

  return { isLoading, exhibitionData };
}

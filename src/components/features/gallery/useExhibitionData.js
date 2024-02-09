import { useQuery } from '@tanstack/react-query';
import { getExhibitionData } from '../../../services/apiGallery';

export function useExhibitionData({ token }) {
  const { isLoading, data: exhibitionData } = useQuery({
    queryKey: ['program-data'],
    queryFn: () => getExhibitionData(token),
  });

  return { isLoading, exhibitionData };
}

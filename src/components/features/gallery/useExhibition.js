import { useQuery } from '@tanstack/react-query';
import { getExhibition } from '../../../services/apiGallery';

export function useExhibition({ id, token }) {
  const { isLoading, data: exhibition } = useQuery({
    queryKey: ['exhibition'],
    queryFn: () => getExhibition(id, token),
  });

  return { isLoading, exhibition };
}

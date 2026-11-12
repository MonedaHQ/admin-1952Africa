import { useQuery } from '@tanstack/react-query';
import { getExhibition } from '../../../services/apiGallery';

export function useExhibition({ id, token }) {
  const { isLoading, data: exhibition } = useQuery({
    queryKey: ['exhibition', id],
    queryFn: () => getExhibition(id, token),
    enabled: Boolean(id && token),
  });

  return { isLoading, exhibition };
}

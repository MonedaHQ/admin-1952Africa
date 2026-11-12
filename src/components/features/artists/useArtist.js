import { useQuery } from '@tanstack/react-query';
import { getArtist } from '../../../services/apiArtists';

export function useArtist(id) {
  const { isLoading, data: artist } = useQuery({
    queryKey: ['artist', id],
    queryFn: () => getArtist(id),
    enabled: Boolean(id),
  });

  return { isLoading, artist };
}

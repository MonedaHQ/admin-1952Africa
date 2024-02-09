import { useQuery } from '@tanstack/react-query';
import { getArtist } from '../../../services/apiArtists';

export function useArtist(id) {
  const { isLoading, data: artist } = useQuery({
    queryKey: ['artist'],
    queryFn: () => getArtist(id),
  });

  return { isLoading, artist };
}

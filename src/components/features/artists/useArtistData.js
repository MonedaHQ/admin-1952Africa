import { useQuery } from '@tanstack/react-query';
import { getArtistData } from '../../../services/apiArtists';

export function useArtistData(token) {
  const { isLoading, data: artistData } = useQuery({
    queryKey: ['artist-data'],
    queryFn: () => getArtistData(token),
  });

  return { isLoading, artistData };
}

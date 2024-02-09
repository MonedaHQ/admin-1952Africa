import toast from 'react-hot-toast';
import { deleteArtist as deleteArtistApi } from '../../../services/apiArtists';
import { useMutation } from '@tanstack/react-query';

export function useDeleteArtist() {
  const { mutate: deleteArtist, isLoading: isDeleting } = useMutation({
    mutationFn: ({ id, token }) => deleteArtistApi(id, token),
    onSuccess: () => {
      toast.success('Artist successfully deleted!');
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { deleteArtist, isDeleting };
}

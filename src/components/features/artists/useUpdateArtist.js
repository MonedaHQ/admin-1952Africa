import toast from 'react-hot-toast';
import { updateArtist as updateArtistApi } from '../../../services/apiArtists';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useUpdateArtist() {
  const navigate = useNavigate();
  const { mutate: updateArtist, isPending: isUpdating } = useMutation({
    mutationFn: ({ payload, id, token }) => updateArtistApi(payload, id, token),
    onSuccess: () => {
      toast.success('Artist successfully updated!');
      navigate('/artists');
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { updateArtist, isUpdating };
}

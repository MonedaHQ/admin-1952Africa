import toast from 'react-hot-toast';
import { createArtist as createArtistApi } from '../../../services/apiArtists';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useCreateArtist() {
  const navigate = useNavigate();
  const { mutate: createArtist, isPending: isCreating } = useMutation({
    mutationFn: ({ form, token }) => createArtistApi(form, token),
    onSuccess: () => {
      toast.success('Artist successfully created!');
      navigate(-1);
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { createArtist, isCreating };
}

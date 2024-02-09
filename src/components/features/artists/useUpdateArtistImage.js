import toast from 'react-hot-toast';
import { updateArtistAvatar as updateArtistAvatarApi } from '../../../services/apiArtists';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useUpdateArtistAvatar() {
  const navigate = useNavigate();
  const { mutate: updateArtistAvatar, isLoading: isUpdating } = useMutation({
    mutationFn: ({ imageFile, id, token }) =>
      updateArtistAvatarApi(imageFile, id, token),
    onSuccess: () => {
      toast.success('Artist successfully updated!');
      navigate('/artists');
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { updateArtistAvatar, isUpdating };
}

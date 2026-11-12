import toast from 'react-hot-toast';
import { updateEventImage as updateEventImageApi } from '../../../services/apiEvents';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useUpdateEventImage() {
  const navigate = useNavigate();
  const { mutate: updateEventImage, isPending: isUpdating } = useMutation({
    mutationFn: ({ imageFile, id, token }) =>
      updateEventImageApi(imageFile, id, token),
    onSuccess: () => {
      toast.success('Event successfully updated!');
      navigate(-1);
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { updateEventImage, isUpdating };
}

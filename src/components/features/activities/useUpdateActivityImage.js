import toast from 'react-hot-toast';
import { updateActivityImage as updateActivityImageApi } from '../../../services/apiProgram';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useUpdateActivityImage() {
  const navigate = useNavigate();
  const { mutate: updateActivityImage, isLoading: isUpdating } = useMutation({
    mutationFn: ({ imageFile, id, token }) =>
      updateActivityImageApi(imageFile, id, token),
    onSuccess: () => {
      toast.success('Activity cover successfully updated!');
      navigate(-1);
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { updateActivityImage, isUpdating };
}

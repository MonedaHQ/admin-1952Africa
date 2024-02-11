import toast from 'react-hot-toast';
import { updateWorkImage as updateWorkImageApi } from '../../../services/apiWorks';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useUpdateWorkImage() {
  const navigate = useNavigate();
  const { mutate: updateWorkImage, isLoading: isUpdating } = useMutation({
    mutationFn: ({ imageFile, id, token }) =>
      updateWorkImageApi(imageFile, id, token),
    onSuccess: () => {
      toast.success('Work successfully updated!');
      navigate(-1);
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { updateWorkImage, isUpdating };
}

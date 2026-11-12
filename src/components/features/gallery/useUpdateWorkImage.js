import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { updateWorkImage as updateWorkImageApi } from '../../../services/apiWorks';

import toast from 'react-hot-toast';

export function useUpdateWorkImage() {
  const navigate = useNavigate();
  const { mutate: updateWorkImage, isPending: isUpdating } = useMutation({
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

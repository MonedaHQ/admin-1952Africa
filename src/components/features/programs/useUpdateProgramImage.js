import toast from 'react-hot-toast';
import { updateProgramImage as updateProgramImageApi } from '../../../services/apiProgram';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useUpdateProgramImage() {
  const navigate = useNavigate();
  const { mutate: updateProgramImage, isPending: isUpdating } = useMutation({
    mutationFn: ({ imageFile, id, token }) =>
      updateProgramImageApi(imageFile, id, token),
    onSuccess: () => {
      toast.success('Program successfully updated!');
      navigate('/programs');
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { updateProgramImage, isUpdating };
}

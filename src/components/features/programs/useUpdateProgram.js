import toast from 'react-hot-toast';
import { updateProgram as updateProgramApi } from '../../../services/apiProgram';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useUpdateProgram() {
  const navigate = useNavigate();
  const { mutate: updateProgram, isPending: isUpdating } = useMutation({
    mutationFn: ({ payload, id, token }) =>
      updateProgramApi(payload, id, token),
    onSuccess: () => {
      toast.success('Program successfully updated!');
      navigate('/programs');
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { updateProgram, isUpdating };
}

import toast from 'react-hot-toast';
import { deleteProgram as deleteProgramApi } from '../../../services/apiProgram';
import { useMutation } from '@tanstack/react-query';

export function useDeleteProgram() {
  const { mutate: deleteProgram, isLoading: isDeleting } = useMutation({
    mutationFn: ({ id, token }) => deleteProgramApi(id, token),
    onSuccess: () => {
      toast.success('Program successfully deleted!');
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { deleteProgram, isDeleting };
}

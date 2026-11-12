import toast from 'react-hot-toast';
import { deleteActivity as deleteActivityApi } from '../../../services/apiProgram';
import { useMutation } from '@tanstack/react-query';

export function useDeleteActivity() {
  const { mutate: deleteActivity, isPending: isDeleting } = useMutation({
    mutationFn: ({ id, token }) => deleteActivityApi(id, token),
    onSuccess: () => {
      toast.success('Activity successfully deleted!');
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { deleteActivity, isDeleting };
}

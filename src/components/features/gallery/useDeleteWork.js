import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

import { deleteWork as deleteWorkApi } from '../../../services/apiWorks';

export function useDeleteWork() {
  const { mutate: deleteWork, isPending: isDeleting } = useMutation({
    mutationFn: ({ id, token }) => deleteWorkApi(id, token),
    onSuccess: () => {
      toast.success('Work successfully deleted!');
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { deleteWork, isDeleting };
}

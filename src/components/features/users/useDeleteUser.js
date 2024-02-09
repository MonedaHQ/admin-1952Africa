import toast from 'react-hot-toast';
import { deleteUser as deleteUserApi } from '../../../services/apiUser';
import { useMutation } from '@tanstack/react-query';

export function useDeleteUser() {
  const { mutate: deleteUser, isLoading: isDeleting } = useMutation({
    mutationFn: ({ id, token }) => deleteUserApi(id, token),
    onSuccess: () => {
      toast.success('User successfully deleted!');
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { deleteUser, isDeleting };
}

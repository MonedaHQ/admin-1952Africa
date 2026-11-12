import { useMutation } from '@tanstack/react-query';

import { updateUser as updateUserApi } from '../../../services/apiUser';
import { toast } from 'react-hot-toast';

export function useUpdateUser() {
  const { mutate: updateUser, isPending: isLoading } = useMutation({
    mutationFn: ({ data, token }) => updateUserApi(data, token),
    onSuccess: () => {
      toast.success('Profile updated successfully!');
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { updateUser, isLoading };
}

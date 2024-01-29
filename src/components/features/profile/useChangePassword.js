import { useMutation } from '@tanstack/react-query';

import { changePassword as changePasswordApi } from '../../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useChangePassword() {
  const { mutate: changePassword, isLoading: isChanging } = useMutation({
    mutationFn: ({ data, token }) => changePasswordApi(data, token),
    onSuccess: () => {
      toast.success('Password updated successfully!');
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { changePassword, isChanging };
}

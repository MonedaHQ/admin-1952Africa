import { useMutation } from '@tanstack/react-query';
import { resetPassword as resetPasswordApi } from '../../../services/apiAuth';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useResetPassword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate: resetPassword, isPending: isResetting } = useMutation({
    mutationFn: ({ email }) => resetPasswordApi(email),
    onSuccess: () => {
      toast.success('Success!');
      searchParams.set('status', 'success');
      setSearchParams(searchParams);
    },
    onError: (err) => {
      toast.error(`${err.message}`);
      searchParams.set('status', 'failed');
      setSearchParams(searchParams);
    },
  });

  return { resetPassword, isResetting };
}

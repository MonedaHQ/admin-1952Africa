import { useMutation } from '@tanstack/react-query';
import { resetPassword as resetPasswordApi } from '../../../services/apiAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useResetPassword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate: resetPassword, isResetting } = useMutation({
    mutationFn: ({ email }) => resetPasswordApi(email),
    onSuccess: () => {
      toast.success('Success!');
      searchParams.set('status', 'success');
      setSearchParams(searchParams);
      //   navigate('/reset-password?status=success', { replace: true });
    },
    onError: (err) => {
      toast.error(`${err.message}`);
      searchParams.set('status', 'failed');
      setSearchParams(searchParams);
    },
  });

  return { resetPassword, isResetting };
}

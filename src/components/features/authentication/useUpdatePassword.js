import { useMutation } from '@tanstack/react-query';
import { updatePassword as updatePasswordApi } from '../../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useUpdatePassword() {
  const navigate = useNavigate();
  const { mutate: updatePassword, isUpdating } = useMutation({
    mutationFn: ({ data, token }) => updatePasswordApi(data, token),
    onSuccess: (user) => {
      console.log(user);
      toast.success('Success!');

      localStorage.setItem(
        '1952adminUser',
        JSON.stringify({ ...user.user, token: user.token })
      );
      navigate('/', { replace: true });
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { updatePassword, isUpdating };
}

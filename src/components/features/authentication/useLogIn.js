import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useLogIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      localStorage.setItem(
        '1952adminUser',
        JSON.stringify({ ...user.user, token: user.token })
      );
      toast.success('Log in successful!');
      navigate('/home', { replace: true });
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { login, isLoading };
}

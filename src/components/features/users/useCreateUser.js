import toast from 'react-hot-toast';
import { createUser as createUserApi } from '../../../services/apiUser';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useCreateUser() {
  const navigate = useNavigate();
  const { mutate: createUser, isLoading: isCreating } = useMutation({
    mutationFn: ({ update, token }) => createUserApi(update, token),
    onSuccess: () => {
      toast.success('User successfully created!');
      navigate('/home');
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { createUser, isCreating };
}

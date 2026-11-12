import toast from 'react-hot-toast';
import { createActivity as createActivityApi } from '../../../services/apiProgram';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useCreateActivity() {
  const navigate = useNavigate();
  const { mutate: createActivity, isPending: isCreating } = useMutation({
    mutationFn: ({ form, token }) => createActivityApi(form, token),
    onSuccess: () => {
      toast.success('Activity successfully created!');
      navigate(-1);
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { createActivity, isCreating };
}

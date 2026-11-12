import toast from 'react-hot-toast';
import { createWork as createWorkApi } from '../../../services/apiWorks';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useCreateWork() {
  const navigate = useNavigate();
  const { mutate: createWork, isPending: isCreating } = useMutation({
    mutationFn: ({ form, token }) => createWorkApi(form, token),
    onSuccess: () => {
      toast.success('Work successfully created!');
      navigate(-1);
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { createWork, isCreating };
}

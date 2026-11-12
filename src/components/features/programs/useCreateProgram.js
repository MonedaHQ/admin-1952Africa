import toast from 'react-hot-toast';
import { createProgram as createProgramApi } from '../../../services/apiProgram';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useCreateProgram() {
  const navigate = useNavigate();
  const { mutate: createProgram, isPending: isCreating } = useMutation({
    mutationFn: ({ form, token }) => createProgramApi(form, token),
    onSuccess: () => {
      toast.success('Program successfully created!');
      navigate('/programs');
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { createProgram, isCreating };
}

import toast from 'react-hot-toast';
import { updateWork as updateWorkApi } from '../../../services/apiWorks';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useUpdateWork() {
  const navigate = useNavigate();
  const { mutate: updateWork, isLoading: isUpdating } = useMutation({
    mutationFn: ({ payload, id, token }) => updateWorkApi(payload, id, token),
    onSuccess: () => {
      toast.success('Work successfully updated!');
      navigate(-1);
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { updateWork, isUpdating };
}

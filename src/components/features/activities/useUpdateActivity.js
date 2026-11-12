import toast from 'react-hot-toast';
import { updateActivity as updateActivityApi } from '../../../services/apiProgram';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useUpdateActivity() {
  const navigate = useNavigate();
  const { mutate: updateActivity, isPending: isUpdating } = useMutation({
    mutationFn: ({ data, id, token }) => updateActivityApi(data, id, token),
    onSuccess: () => {
      toast.success('Activity successfully updated!');
      navigate(-1);
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { updateActivity, isUpdating };
}

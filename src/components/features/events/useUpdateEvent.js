import toast from 'react-hot-toast';
import { updateEvent as updateEventApi } from '../../../services/apiEvents';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useUpdateEvent() {
  const navigate = useNavigate();
  const { mutate: updateEvent, isLoading: isUpdating } = useMutation({
    mutationFn: ({ payload, id, token }) => updateEventApi(payload, id, token),
    onSuccess: () => {
      toast.success('Event successfully updated!');
      navigate(-1);
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { updateEvent, isUpdating };
}

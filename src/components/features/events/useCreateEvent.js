import toast from 'react-hot-toast';
import { createEvent as createEventApi } from '../../../services/apiEvents';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useCreateEvent() {
  const navigate = useNavigate();
  const { mutate: createEvent, isPending: isCreating } = useMutation({
    mutationFn: ({ form, token }) => createEventApi(form, token),
    onSuccess: () => {
      toast.success('Event successfully created!');
      navigate(-1);
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { createEvent, isCreating };
}

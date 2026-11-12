import toast from 'react-hot-toast';
import { deleteEvent as deleteEventApi } from '../../../services/apiEvents';
import { useMutation } from '@tanstack/react-query';

export function useDeleteEvent() {
  const { mutate: deleteEvent, isPending: isDeleting } = useMutation({
    mutationFn: ({ id, token }) => deleteEventApi(id, token),
    onSuccess: () => {
      toast.success('Event successfully deleted!');
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { deleteEvent, isDeleting };
}

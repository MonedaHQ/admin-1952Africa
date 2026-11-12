import toast from 'react-hot-toast';
import { deleteExhibition as deleteExhibitionApi } from '../../../services/apiGallery';
import { useMutation } from '@tanstack/react-query';

export function useDeleteExhibition() {
  const { mutate: deleteExhibition, isPending: isDeleting } = useMutation({
    mutationFn: ({ id, token }) => deleteExhibitionApi(id, token),
    onSuccess: () => {
      toast.success('Exhibition successfully deleted!');
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { deleteExhibition, isDeleting };
}

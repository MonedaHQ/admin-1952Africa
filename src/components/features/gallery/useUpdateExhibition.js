import toast from 'react-hot-toast';
import { updateExhibition as updateExhibitionApi } from '../../../services/apiGallery';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useUpdateExbition() {
  const navigate = useNavigate();
  const { mutate: updateExhibition, isLoading: isUpdating } = useMutation({
    mutationFn: ({ payload, id, token }) =>
      updateExhibitionApi(payload, id, token),
    onSuccess: () => {
      toast.success('Exhbition successfully updated!');
      navigate(-1);
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { updateExhibition, isUpdating };
}

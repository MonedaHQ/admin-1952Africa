import toast from 'react-hot-toast';
import { updateExhibitionImage as updateExhibitionImageApi } from '../../../services/apiGallery';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useUpdateExhibitionImage() {
  const navigate = useNavigate();
  const { mutate: updateExhibitionImage, isLoading: isUpdating } = useMutation({
    mutationFn: ({ imageFile, id, token }) =>
      updateExhibitionImageApi(imageFile, id, token),
    onSuccess: () => {
      toast.success('Exhibition successfully updated!');
      navigate(-1);
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { updateExhibitionImage, isUpdating };
}

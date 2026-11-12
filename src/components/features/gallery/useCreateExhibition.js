import toast from 'react-hot-toast';
import { createExhibition as createExhibitionApi } from '../../../services/apiGallery';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useCreateExhibition() {
  const navigate = useNavigate();
  const { mutate: createExhibition, isPending: isCreating } = useMutation({
    mutationFn: ({ form, token }) => createExhibitionApi(form, token),
    onSuccess: () => {
      toast.success('Exhibition successfully created!');
      navigate(-1);
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { createExhibition, isCreating };
}

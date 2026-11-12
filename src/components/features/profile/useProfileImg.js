import { useMutation } from '@tanstack/react-query';

import { updateProfileImage } from '../../../services/apiUser';
import { toast } from 'react-hot-toast';

export function useProfileImg() {
  const { mutate: updateProfileImg, isPending: isLoading } = useMutation({
    mutationFn: ({ image, token }) => updateProfileImage(image, token),
    onSuccess: () => {
      toast.success('Profile picture updated!');
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { updateProfileImg, isLoading };
}

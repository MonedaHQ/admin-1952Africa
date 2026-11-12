import toast from 'react-hot-toast';
import { upgradeUserRole as upgradeUserRoleApi } from '../../../services/apiUser';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export function useUpgradeUserRole() {
  const navigate = useNavigate();
  const { mutate: upgradeUser, isPending: isUpgrading } = useMutation({
    mutationFn: ({ payload, id, token }) =>
      upgradeUserRoleApi(payload, id, token),
    onSuccess: () => {
      toast.success('User successfully upgraded!');
      navigate('/users');
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { upgradeUser, isUpgrading };
}

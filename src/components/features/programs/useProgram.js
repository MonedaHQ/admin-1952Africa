import { useQuery } from '@tanstack/react-query';
import { getProgram } from '../../../services/apiProgram';

export function useProgram({ id }) {
  const { isLoading, data: program } = useQuery({
    queryKey: ['program', id],
    queryFn: () => getProgram(id),
    enabled: Boolean(id),
  });

  return { isLoading, program };
}

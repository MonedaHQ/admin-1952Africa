import { useQuery } from '@tanstack/react-query';
import { getProgram } from '../../../services/apiProgram';

export function useProgram({ id }) {
  const { isLoading, data: program } = useQuery({
    queryKey: ['program'],
    queryFn: () => getProgram(id),
  });

  return { isLoading, program };
}
